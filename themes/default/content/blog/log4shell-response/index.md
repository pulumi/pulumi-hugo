---
title: "Dealing with Log4Shell"
date: 2021-12-13
draft: false
meta_desc: |
    Pulumi does not use the log4j library and is not directly affected. However,
    if you want to learn more about mitigation techniques as users of
    third-party systems, read on.
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - security
---

The recent security vulnerability CVE-2021-44228, or Log4Shell, that affects the
log4j logging library for Java is a significant CVE for cloud engineers due to
its wide-ranging attack possibilities. While we here at Pulumi do not use Java
and are not directly affected, we've had enough questions about our mitigation
plan that we thought a blog post discussing this issue and general steps both
cloud engineers and users of third-party systems could take to remediate would
be useful.

<!-- more -->

## Pulumi is not directly affected

First and foremost, Pulumi does not use Java, and we do not use the log4j
library. We are not directly affected by the vulnerability. However, like many
folks, we are using cloud-based systems and other tools that we do not have
direct access to that are using log4j. There are steps that we, as users, take
to secure our systems that you can also do if you aren't sure what to do other
than keep asking questions of your providers (which you absolutely should do!).

## Things to consider as users

The following thoughts assume that you are not in control of the possible
logging server and cannot update the version of log4j. If you have access to do
so, stop and update the library to 2.15.0 or higher immediately (see the [Apache
Log4j Security Vulnerabilities
page](https://logging.apache.org/log4j/2.x/security.html) for more information).

### Sanitize any user input

The main concern with Log4Shell is lateral motion from one server to another in
a system, including to systems that are not facing the internet, through the
Java Naming and Directory Interface (JNDI). These JNDI addresses allow a
malicious actor to cause a log message to trigger a call to another part of the
system, which then sends data to a system owned by that actor, such as through
an HTTP POST call to send data or an HTTP GET call to download malicious
packages onto previously isolated systems. All of these problems stem from using
user input in logs. Ideally, a logging platform should sanitize user input
before allowing it to access the rest of the system (e.g., using it in a log
message). What does that mean, exactly? Well, just like with any program, user
input should be assumed to be malicious unless proven otherwise through methods
like transforming that input into a string. That process is known as
sanitization, and it's a very common security step. You should sanitize input
with your Pulumi program as well if you're using something like the automation
API that takes input from other systems or a command line interface.

### Isolate your concerns

If you are not in control of that sanitization, you should attempt to separate
your concerns by isolating your logging system to a write-only archive. This
means that the logging system should not be able to write out to any system, and
no system should be able to edit any logs that are sent to that system. How does
that help? One of the most common concerns with the Log4Shell is the ability of
the JNDI to connect to any Lightweight Directory Access Protocol (LDAP) server
and therefore make calls against any interconnected component of a system. If
the logging system is isolated so that it cannot trigger any program, process,
or workflow, it should also not be able to make any call out to the internet
save perhaps from an approved list of servers (e.g., your PagerDuty endpoint).

---

All in all, there is always risk when using third-party tools. The idea is to
mitigate the risk as much as possible through careful consideration of possible
attack vectors to evaluate tradeoffs, knowledge of the ring of trust, protection
through sandboxing or isolating systems that are unrelated, and a plan for
eventual breaches.

## If you need to remediate

Please note that we are not a logging provider, and we are not the experts on
the subject, just fellow users. If you are looking for remediation help for your
systems that directly run log4j, please refer to the [Apache Log4j Security
Vulnerabilities page](https://logging.apache.org/log4j/2.x/security.html) for
proper remediation steps and the official [CVE
record](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228) for more
details.

We know how hard this is considering that many platforms and systems are in code
freeze for the holiday season. We wish you the best of luck in remediation
efforts.
