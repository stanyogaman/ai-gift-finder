import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInAnonymously,
    signInWithCustomToken
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    setDoc,
    deleteDoc,
    onSnapshot,
    query
} from 'firebase/firestore';
import { allGifts } from './data/gifts';
import { quizTree } from './data/quizTree';
import { buildQuizRecommendations, buildSearchRecommendations } from './utils/recommendations';

// --- ICON COMPONENTS ---
const HeartIcon = ({ className = 'w-6 h-6', isFilled = false }) => (
    <svg className={className} fill={isFilled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);
const ShareIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v12" />
    </svg>
);
const UserIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
const SearchIcon = ({ className = 'w-5 h-5' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const AdminIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);
const ArrowLeftIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

// --- MAIN APP COMPONENT ---
export default function App() {
    const [page, setPage] = useState('home');
    const [results, setResults] = useState({ title: '', gifts: [] });
    const [isLoading, setIsLoading] = useState(false);
    
    const [auth, setAuth] = useState(null);
    const [db, setDb] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    
    const [likedGifts, setLikedGifts] = useState(new Set());
    
    // Fix for FirebaseError: Invalid collection reference
    const appId = useMemo(() => {
        const providedId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        // Firestore does not like '/' or '.' in collection names
        return providedId.replace(/[\/.]/g, '_'); 
    }, []);
    
    // Firebase initialization
    useEffect(() => {
        try {
            const firebaseConfig = typeof __firebase_config !== 'undefined'
                ? JSON.parse(__firebase_config)
                : null;

            if (firebaseConfig && appId) {
                const app = initializeApp(firebaseConfig);
                const authInstance = getAuth(app);
                const dbInstance = getFirestore(app);
                setAuth(authInstance);
                setDb(dbInstance);

                const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
                    setUser(currentUser);
                    setIsAuthReady(true);
                });

                if (typeof __initial_auth_token !== 'undefined' && !authInstance.currentUser) {
                    signInWithCustomToken(authInstance, __initial_auth_token).catch(error => {
                       console.error("Custom token sign-in failed:", error);
                       signInAnonymously(authInstance).catch(e => console.error("Anonymous fallback failed:", e));
                    });
                } else if (!authInstance.currentUser) {
                    signInAnonymously(authInstance).catch(error => console.error("Anonymous sign-in failed:", error));
                }

                return () => unsubscribe();
            } else {
                 console.error("Firebase config or App ID is not available.");
                 setIsAuthReady(true);
            }
        } catch (error) {
            console.error("Firebase initialization failed:", error);
            setIsAuthReady(true);
        }
    }, [appId]); // Include appId in dependency array

    // Synchronize liked gifts
    useEffect(() => {
        if (isAuthReady && user && db) {
            const likedGiftsCol = collection(db, 'artifacts', appId, 'users', user.uid, 'likedGifts');
            const unsubscribe = onSnapshot(likedGiftsCol, (snapshot) => {
                const newLikedGifts = new Set();
                snapshot.forEach(doc => newLikedGifts.add(doc.id));
                setLikedGifts(newLikedGifts);
            }, (error) => {
                console.error("Error setting up liked gifts listener:", error);
            });
            return () => unsubscribe();
        } else {
             setLikedGifts(new Set());
        }
    }, [isAuthReady, user, db, appId]);

    // Search handling
    const handleSearch = async (queryText) => {
        const trimmedQuery = queryText.trim();
        if (!trimmedQuery) return;

        setIsLoading(true);
        setPage('results');

        if (db && user) {
            try {
                const queriesCol = collection(db, 'artifacts', appId, 'public', 'data', 'searchQueries');
                await addDoc(queriesCol, {
                    query: trimmedQuery,
                    userId: user.uid,
                    timestamp: new Date()
                });
            } catch (error) {
                console.error("Error logging search query:", error);
            }
        }

        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate recommendation engine work

        const recommendedGifts = buildSearchRecommendations(allGifts, trimmedQuery);
        setResults({ title: `Results for "${trimmedQuery}"`, gifts: recommendedGifts });
        setIsLoading(false);
    };

    // Quiz handling
    const handleQuizComplete = (answers) => {
        setIsLoading(true);
        setPage('results');
        
        // Log quiz answers to Firestore
        if (db && user) {
             try {
                const quizSubmissionsCol = collection(db, 'artifacts', appId, 'public', 'data', 'quizSubmissions');
                addDoc(quizSubmissionsCol, {
                    answers: answers,
                    userId: user.uid,
                    timestamp: new Date()
                });
            } catch (error) {
                console.error("Error logging quiz submission:", error);
            }
        }

        setTimeout(() => {
            const recommendedGifts = buildQuizRecommendations(allGifts, answers);
            setResults({ title: "Your personalized matches", gifts: recommendedGifts });
            setIsLoading(false);
        }, 1500);
    };

    // Like handling
    const handleLikeToggle = async (gift) => {
        if (!user || !db || user.isAnonymous) {
            setPage('login');
            return;
        }
        
        const giftRef = doc(db, 'artifacts', appId, 'users', user.uid, 'likedGifts', gift.id);
        
        try {
            if (likedGifts.has(gift.id)) {
                await deleteDoc(giftRef);
            } else {
                await setDoc(giftRef, gift);
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };
    
    // Render page
    const renderPage = () => {
        switch (page) {
            case 'quiz': return <QuizPage onComplete={handleQuizComplete} onBack={() => setPage('home')} />;
            case 'results': return <ResultsPage results={results} isLoading={isLoading} onLikeToggle={handleLikeToggle} likedGifts={likedGifts} />;
            case 'login': return <LoginPage auth={auth} onLogin={() => setPage('home')} />;
            case 'cabinet': return <CabinetPage db={db} user={user} isAuthReady={isAuthReady} onLikeToggle={handleLikeToggle} likedGifts={likedGifts} appId={appId} />;
            case 'admin': return <AdminPage db={db} user={user} isAuthReady={isAuthReady} appId={appId} />;
            default: return <HomePage onSearch={handleSearch} onStartQuiz={() => setPage('quiz')} />;
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
            <Header currentPage={page} setPage={setPage} user={user} auth={auth} />
            <main className="px-4 py-8 md:px-8 md:py-12">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}

// --- PAGE AND UI COMPONENTS ---

const Header = ({ currentPage, setPage, user, auth }) => {
    const handleSignOut = () => {
        if (auth) {
            signOut(auth).then(() => setPage('home'));
        }
    }
    
    return (
        <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
                    <span className="text-3xl">🎁</span>
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                        Gifty AI
                    </h1>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                    {user && !user.isAnonymous && (
                        <>
                            <button onClick={() => setPage('cabinet')} className="flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors">
                                <HeartIcon className="w-5 h-5" isFilled={currentPage === 'cabinet'} />
                                <span className="hidden md:inline">My saved gifts</span>
                            </button>
                            {user.email === 'admin@gifty.ai' && (
                                <button onClick={() => setPage('admin')} className="flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors">
                                    <AdminIcon className="w-5 h-5" />
                                    <span className="hidden md:inline">Admin</span>
                                </button>
                            )}
                        </>
                    )}
                    {user && !user.isAnonymous ? (
                        <button onClick={handleSignOut} className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600 transition-transform hover:scale-105">
                            Sign out
                        </button>
                    ) : (
                        <button onClick={() => setPage('login')} className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-600 transition-transform hover:scale-105">
                            <UserIcon className="w-5 h-5" />
                            <span>Sign in</span>
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

const HomePage = ({ onSearch, onStartQuiz }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className="container mx-auto text-center flex flex-col items-center gap-12">
            <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900">Find the perfect gift <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">in seconds.</span></h2>
                <p className="mt-4 text-lg text-slate-600">
                    Let our AI shortlist personalized gift ideas or go deeper with our guided quiz.
                </p>
            </div>
            
            <div className="w-full max-w-2xl p-6 bg-white rounded-2xl shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold mb-4">Search for a gift with AI</h3>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-grow">
                         <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                         <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g. 'Birthday gift for my boss under $100'"
                            className="w-full h-14 pl-12 pr-4 text-md bg-slate-100 border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
                        />
                    </div>
                    <button type="submit" className="h-14 px-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:opacity-90 transition-opacity transform hover:scale-105">
                        Find gifts
                    </button>
                </form>
            </div>
            
            <div className="w-full max-w-2xl p-6 text-center">
                 <p className="text-slate-500 mb-4">~ or ~</p>
                 <h3 className="text-2xl font-bold mb-2">Not sure where to start?</h3>
                 <p className="text-slate-600 mb-4">Take the guided quiz and we will curate a tailored list for you.</p>
                 <button onClick={onStartQuiz} className="px-10 py-4 bg-teal-400 text-white font-bold rounded-full hover:bg-teal-500 transition-all transform hover:scale-105 shadow-md">
                     Take the gift quiz
                 </button>
            </div>
        </div>
    );
};

// --- QUIZ COMPONENT WITH BRANCHING ---
const QuizPage = ({ onComplete, onBack }) => {
    const [history, setHistory] = useState(['start']); // History for back button
    const [answers, setAnswers] = useState({});
    
    const currentQuestionId = history[history.length - 1];
    const { id, question, answers: answerOptions } = quizTree[currentQuestionId];
    
    const handleAnswer = (questionId, answerValue, nextQuestionId) => {
        const newAnswers = {...answers, [questionId]: answerValue};
        setAnswers(newAnswers);
        
        if (nextQuestionId === 'END') {
            onComplete(newAnswers);
        } else {
            setHistory([...history, nextQuestionId]); // Move to the next step
        }
    };

    const handleBack = () => {
        if (history.length > 1) {
            // Drop current answer when going back
            const lastQuestionId = history[history.length - 1];
            const { [lastQuestionId]: _, ...remainingAnswers } = answers;
            setAnswers(remainingAnswers);
            setHistory(history.slice(0, -1)); // Step back
        } else {
            onBack(); // Return to home if first question
        }
    };
    
    const progress = ((history.length - 1) / (Object.keys(quizTree).length -1)) * 100; // Approximate progress
    
    return (
        <div className="container mx-auto max-w-3xl">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-slate-200">
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                         <button onClick={handleBack} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                            <ArrowLeftIcon className="w-6 h-6 text-slate-600" />
                         </button>
                         <div className="w-full mx-4 bg-slate-200 rounded-full h-2.5">
                            <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                         </div>
                    </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{question}</h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {answerOptions.map((ans, index) => (
                        <button 
                            key={index} 
                            onClick={() => handleAnswer(id, ans.value, ans.next)} 
                            className="flex flex-col items-center justify-center text-center gap-2 p-4 bg-slate-100 rounded-xl hover:bg-purple-100 hover:scale-105 transition-all duration-200 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 md:h-36"
                        >
                            <span className="text-4xl">{ans.icon}</span>
                            <span className="font-semibold">{ans.text}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ResultsPage = ({ results, isLoading, onLikeToggle, likedGifts }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-16 h-16 border-4 border-t-purple-500 border-slate-200 rounded-full animate-spin"></div>
                <h2 className="text-2xl font-bold text-slate-700">Gifty AI is curating...</h2>
                <p className="text-slate-500">We are analyzing your answers and pulling the best matches!</p>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">{results.title}</h2>
            {results.gifts.length === 0 ? (
                <p className="text-center text-slate-500">No gifts were found. Try adjusting your search!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {results.gifts.map(gift => (
                        <GiftCard 
                            key={gift.id} 
                            gift={gift} 
                            onLikeToggle={onLikeToggle} 
                            isLiked={likedGifts.has(gift.id)} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const GiftCard = ({ gift, onLikeToggle, isLiked }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    
    const compatibilityColor = useMemo(() => {
        const score = gift.compatibility
        if (score >= 60) return 'bg-green-500';
        if (score >= 30) return 'bg-yellow-400';
        if (score > 0) return 'bg-orange-400';
        return 'bg-slate-400';
    }, [gift.compatibility]);

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-slate-200 transform transition-transform duration-300 hover:-translate-y-2">
            <div className="relative">
                <img src={gift.imageUrl} alt={gift.title} className="w-full h-48 object-cover" />
                <div className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full ${compatibilityColor}`}>
                    {gift.compatibility > 0 ? `${gift.compatibility}% match` : 'Recommended'}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-lg flex-grow">{gift.title}</h3>
                <p className="text-sm text-slate-600 mt-1 mb-3 line-clamp-2">{gift.description}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500 mt-auto">
                    <span className="text-yellow-500">⭐</span>
                    <span>{gift.rating} ({gift.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-xl font-extrabold text-purple-600">${gift.price}</p>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsShareModalOpen(true)} className="p-2 rounded-full hover:bg-slate-200 transition-colors">
                            <ShareIcon className="w-5 h-5 text-slate-600" />
                        </button>
                        <button onClick={() => onLikeToggle(gift)} className="p-2 rounded-full hover:bg-slate-200 transition-colors">
                            <HeartIcon className={`w-5 h-5 ${isLiked ? 'text-pink-500' : 'text-slate-600'}`} isFilled={isLiked} />
                        </button>
                    </div>
                </div>
                 <a href={`https://www.amazon.com/s?k=${encodeURIComponent(gift.title)}`} target="_blank" rel="noopener noreferrer" className="mt-4 w-full text-center bg-slate-800 text-white font-bold py-2 rounded-lg hover:bg-slate-900 transition-colors">
                    View on Amazon
                </a>
            </div>
            {isShareModalOpen && <ShareModal gift={gift} onClose={() => setIsShareModalOpen(false)} />}
        </div>
    );
};

const ShareModal = ({ gift, onClose }) => {
    const shareUrl = `https://gifty-ai-demo.com/gift/${gift.id}`; // Placeholder
    const shareText = `Check out this gift idea I found on Gifty AI: ${gift.title}!`;
    
    const socialLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-4">Share this gift</h3>
                <p className="text-slate-500 mb-4">{gift.title}</p>
                <div className="flex justify-around items-center">
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:scale-125 transition-transform"><svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg></a>
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:scale-125 transition-transform"><svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                    <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:scale-125 transition-transform"><svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.908 6.161l.217.324-1.246 4.564 4.672-1.225.335.198z"/></svg></a>
                    <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:scale-125 transition-transform"><svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M15 12l-4-4 1-6 8 2-2 6-3 2zm-2 2l-7 5 3-5 4 0z"/></svg></a>
                </div>
            </div>
        </div>
    );
};

const LoginPage = ({ auth, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!auth) {
            setError("Authentication service is unavailable.");
            return;
        }

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            onLogin();
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        }
    };

    return (
        <div className="container mx-auto max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                <div className="flex border-b-2 border-slate-200 mb-6">
                    <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 font-bold ${isLogin ? 'text-purple-600 border-b-4 border-purple-600' : 'text-slate-500'}`}>
                        Sign in
                    </button>
                     <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 font-bold ${!isLogin ? 'text-purple-600 border-b-4 border-purple-600' : 'text-slate-500'}`}>
                        Create account
                    </button>
                </div>

                <h2 className="text-2xl font-bold text-center mb-1">{isLogin ? "Welcome back!" : "Create your account"}</h2>
                <p className="text-slate-500 text-center mb-6">{isLogin ? "Sign in to see your saved gifts." : "Join to start saving the ideas you love."}</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="w-full p-3 bg-slate-100 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full p-3 bg-slate-100 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button type="submit" className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                        {isLogin ? 'Sign in' : 'Create account'}
                    </button>
                </form>
                
                {!isLogin && (
                    <p className="text-xs text-slate-400 text-center mt-4">Sign up to unlock our "Top 20 gifts" starter guide!</p>
                )}
            </div>
        </div>
    );
};

const CabinetPage = ({ db, user, isAuthReady, onLikeToggle, likedGifts: likedGiftIds, appId }) => {
    const [myGifts, setMyGifts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isAuthReady && user && db) {
            const likedGiftsCol = collection(db, 'artifacts', appId, 'users', user.uid, 'likedGifts');
            const unsubscribe = onSnapshot(likedGiftsCol, (snapshot) => {
                const gifts = [];
                snapshot.forEach(doc => gifts.push(doc.data()));
                setMyGifts(gifts);
                setIsLoading(false);
            }, (error) => {
                console.error("Error fetching liked gifts:", error);
                setIsLoading(false);
            });
            return () => unsubscribe();
        } else if (isAuthReady) {
            setIsLoading(false);
        }
    }, [isAuthReady, user, db, appId]);

    if (!isAuthReady || isLoading) {
         return <div className="text-center text-slate-500">Loading your saved list...</div>;
    }

    if (!user || user.isAnonymous) {
        return <div className="text-center text-slate-500">Please sign in to view your saved gifts.</div>;
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-2">My saved gifts</h2>
            <p className="text-slate-600 mb-6">Every idea you liked lives here for quick reference.</p>
            {myGifts.length === 0 ? (
                <div className="text-center p-8 bg-white rounded-lg border-2 border-dashed">
                    <p className="text-slate-500">This space is empty. Tap the heart on any gift to save it here!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {myGifts.map(gift => (
                        <GiftCard 
                            key={gift.id} 
                            gift={gift} 
                            onLikeToggle={onLikeToggle} 
                            isLiked={likedGiftIds.has(gift.id)} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const AdminPage = ({ db, user, isAuthReady, appId }) => {
    const [queries, setQueries] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const isAdmin = user && user.email === 'admin@gifty.ai';

     useEffect(() => {
        if (isAuthReady && isAdmin && db) {
            setIsLoading(true);
            const queriesCol = collection(db, 'artifacts', appId, 'public', 'data', 'searchQueries');
            const quizzesCol = collection(db, 'artifacts', appId, 'public', 'data', 'quizSubmissions');
            
            const unsubQueries = onSnapshot(query(queriesCol), (snapshot) => {
                const searchData = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.timestamp) {
                        searchData.push({ id: doc.id, ...data, timestamp: data.timestamp.toDate() });
                    }
                });
                setQueries(searchData.sort((a,b) => b.timestamp - a.timestamp));
            }, (error) => console.error("Error fetching search queries:", error));

            const unsubQuizzes = onSnapshot(query(quizzesCol), (snapshot) => {
                const quizData = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.timestamp) {
                        quizData.push({ id: doc.id, ...data, timestamp: data.timestamp.toDate() });
                    }
                });
                setQuizzes(quizData.sort((a,b) => b.timestamp - a.timestamp));
            }, (error) => console.error("Error fetching quiz submissions:", error));

            setIsLoading(false);
            return () => {
                unsubQueries();
                unsubQuizzes();
            };
        } else if(isAuthReady){
            setIsLoading(false);
        }
    }, [isAuthReady, isAdmin, db, appId]);

    if (!isAuthReady || isLoading) {
        return <div className="text-center text-slate-500">Loading admin dashboard...</div>;
    }

    if (!isAdmin) {
        return <div className="text-center text-red-500 font-bold">Access denied.</div>;
    }

    return (
        <div className="container mx-auto">
             <h2 className="text-3xl font-bold mb-6">Admin dashboard</h2>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div>
                    <h3 className="text-2xl font-semibold mb-4">Latest search queries</h3>
                     <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-96 overflow-y-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-100 sticky top-0">
                                <tr>
                                    <th className="p-4 font-semibold">Time</th>
                                    <th className="p-4 font-semibold">Query</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queries.map(q => (
                                    <tr key={q.id} className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="p-4 text-slate-600 whitespace-nowrap">{q.timestamp.toLocaleString()}</td>
                                        <td className="p-4 font-medium">{q.query}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                 </div>
                 <div>
                    <h3 className="text-2xl font-semibold mb-4">Recent quiz submissions</h3>
                     <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-96 overflow-y-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-100 sticky top-0">
                                <tr>
                                    <th className="p-4 font-semibold">Time</th>
                                    <th className="p-4 font-semibold">Answers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizzes.map(q => (
                                    <tr key={q.id} className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="p-4 text-slate-600 whitespace-nowrap">{q.timestamp.toLocaleString()}</td>
                                        <td className="p-4 text-sm text-slate-500">
                                            {Object.entries(q.answers).map(([key, value]) => (
                                                <span key={key} className="inline-block bg-slate-200 rounded-full px-2 py-0.5 text-xs font-medium text-slate-700 mr-1 mb-1">{value}</span>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                 </div>
             </div>
        </div>
    )
}

const Footer = () => (
    <footer className="bg-slate-800 text-slate-300 mt-16 py-8">
        <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Gifty AI. All rights reserved.</p>
            <p className="text-sm text-slate-400 mt-2">AI-powered gift discovery.</p>
        </div>
    </footer>
);
