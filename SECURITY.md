# Security Advisory

## CVE-2025-55182: React2Shell - Critical Remote Code Execution Vulnerability

### ✅ STATUS: NOT VULNERABLE

This project is **NOT vulnerable** to CVE-2025-55182 (React2Shell).

### Summary

CVE-2025-55182, also known as "React2Shell", is a critical unauthenticated remote code execution (RCE) vulnerability in React Server Components (RSC) "Flight" protocol.

**CVSS Score:** 10.0 (CRITICAL)
**Disclosure Date:** December 3, 2025
**Active Exploitation:** Yes - multiple China state-nexus threat groups observed exploiting this vulnerability within hours of disclosure

### Vulnerability Details

- **Affected Components:** React Server Components (RSC) using the Flight protocol
- **Attack Vector:** Network (CVSS AV:N) - requires only a crafted HTTP request
- **Attack Complexity:** Low (CVSS AC:L) - default configurations are vulnerable
- **Privileges Required:** None (CVSS PR:N) - unauthenticated exploitation
- **User Interaction:** None (CVSS UI:N)
- **Impact:** Remote Code Execution with complete system compromise

### Affected Versions

**React:**
- ❌ 19.0
- ❌ 19.1.0
- ❌ 19.1.1
- ❌ 19.2.0

**Next.js:**
- ❌ Versions prior to 14.2.35 (when using React Server Components)

### Patched Versions

**React:**
- ✅ 19.0.1
- ✅ 19.1.2
- ✅ 19.2.1

**Next.js:**
- ✅ 14.2.35 or later (for Next.js 13.3+)

### Our Protection Status

**Current Versions:**
- ✅ React: `18.3.1` (React 18 - not affected by this vulnerability)
- ✅ React DOM: `18.3.1`
- ✅ Next.js: `14.2.35` (patched version)

**Why We're Protected:**
1. **React 18.3.1**: This vulnerability only affects React 19.x. Our project uses React 18, which does not contain the vulnerable code.
2. **Next.js 14.2.35**: We've upgraded to the patched Next.js version that includes mitigations for RSC-related vulnerabilities.

### Additional Security Fixes Included

Our current Next.js version (14.2.35) also includes fixes for:
- **CVE-2025-55184** - Next.js vulnerability (HIGH severity)
- **CVE-2025-67779** - Next.js vulnerability (HIGH severity)

### Recommendations

1. ✅ **Maintain Current Versions** - Continue using React 18.3.1 and Next.js 14.2.35
2. ⚠️ **Delay React 19 Migration** - If considering upgrading to React 19, ensure you use version 19.0.1, 19.1.2, or 19.2.1 or later
3. ✅ **Regular Updates** - Monitor security advisories and apply updates promptly
4. ✅ **Dependency Scanning** - Regularly scan dependencies for known vulnerabilities

### References

- [React Official Advisory](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)
- [Wiz Security Research - React2Shell Analysis](https://www.wiz.io/blog/critical-vulnerability-in-react-cve-2025-55182)
- [NVD Entry - CVE-2025-55182](https://nvd.nist.gov/vuln/detail/CVE-2025-55182)
- [Vercel Summary](https://vercel.com/changelog/cve-2025-55182)
- [Cisco Security Advisory](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-react-flight-TYw32Ddb)
- [Palo Alto Unit 42 Analysis](https://unit42.paloaltonetworks.com/cve-2025-55182-react-and-cve-2025-66478-next/)
- [AWS Security Blog - Active Exploitation](https://aws.amazon.com/blogs/security/china-nexus-cyber-threat-groups-rapidly-exploit-react2shell-vulnerability-cve-2025-55182/)
- [Microsoft Security Blog - Defense Guidance](https://www.microsoft.com/en-us/security/blog/2025/12/15/defending-against-the-cve-2025-55182-react2shell-vulnerability-in-react-server-components/)
- [Akamai Research](https://www.akamai.com/blog/security-research/cve-2025-55182-react-nextjs-server-functions-deserialization-rce)
- [Datadog Security Labs](https://securitylabs.datadoghq.com/articles/cve-2025-55182-react2shell-remote-code-execution-react-server-components/)

### Security Contact

If you discover a security vulnerability in this project, please report it to the repository maintainers.

---

**Last Updated:** December 26, 2025
**Next Review:** Monitor React and Next.js security advisories monthly
