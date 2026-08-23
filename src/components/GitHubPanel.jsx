import { useEffect, useState } from "react";
import { profile } from "../data";
import Reveal from "./Reveal";
import useMagnetic from "../hooks/useMagnetic";

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Liquid: "#67b8de",
  Python: "#3572a5",
  Shell: "#89e051",
  Vue: "#41b883",
  SCSS: "#c6538c",
};
const colorFor = (name) => LANG_COLORS[name] || "var(--color-neutral-500)";
const fmt = (n) => (typeof n === "number" ? n.toLocaleString("en-US") : "—");

function relativeDate(iso) {
  if (!iso) return "";
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "Updated today";
  if (days === 1) return "Updated yesterday";
  if (days < 30) return `Updated ${days} days ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `Updated ${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.round(days / 365);
  return `Updated ${years} year${years > 1 ? "s" : ""} ago`;
}

const MAX_REPOS = 6;

export default function GitHubPanel() {
  const [status, setStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [langs, setLangs] = useState([]);
  const profileBtnRef = useMagnetic();

  useEffect(() => {
    let cancelled = false;
    const handle = profile.github;

    async function load() {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${handle}`),
          fetch(`https://api.github.com/users/${handle}/repos?per_page=100&sort=updated`),
        ]);
        if (!uRes.ok || !rRes.ok) {
          throw new Error(
            uRes.status === 403 || rRes.status === 403
              ? "GitHub's public API rate limit was reached from this browser. The figures are still on the profile itself."
              : `GitHub responded with ${uRes.ok ? rRes.status : uRes.status}.`
          );
        }
        const u = await uRes.json();
        const all = (await rRes.json()).filter((r) => !r.fork);
        const sorted = all.sort(
          (a, b) =>
            b.stargazers_count - a.stargazers_count ||
            new Date(b.pushed_at) - new Date(a.pushed_at)
        );

        let langResult = [];
        try {
          const results = await Promise.all(
            sorted.slice(0, 6).map((r) =>
              fetch(`https://api.github.com/repos/${r.full_name}/languages`)
                .then((res) => (res.ok ? res.json() : {}))
                .catch(() => ({}))
            )
          );
          const totals = {};
          results.forEach((map) => {
            Object.entries(map).forEach(([k, v]) => {
              totals[k] = (totals[k] || 0) + v;
            });
          });
          const sum = Object.values(totals).reduce((a, b) => a + b, 0);
          if (sum > 0) {
            langResult = Object.entries(totals)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 6)
              .map(([name, bytes]) => ({ name, pct: (bytes / sum) * 100 }));
          }
        } catch {
          /* language breakdown is optional */
        }

        if (cancelled) return;
        setUser(u);
        setRepos(sorted);
        setLangs(langResult);
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        setErrorMsg(err.message || "The request could not be completed.");
        setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const meta = user
    ? [user.name, user.location].filter(Boolean).join(" · ") || `github.com/${profile.github}`
    : `github.com/${profile.github}`;
  const visibleRepos = repos.slice(0, MAX_REPOS);
  const totalStars = fmt(repos.reduce((s, r) => s + (r.stargazers_count || 0), 0));
  const totalForks = fmt(repos.reduce((s, r) => s + (r.forks_count || 0), 0));
  const footnote = repos.length
    ? `Showing ${Math.min(repos.length, MAX_REPOS)} of ${repos.length} public source repositories, newest activity first.`
    : "No public source repositories returned by the API.";

  return (
    <section id="github" className="section section-surface section-github">
      <div className="section-inner github-grid" data-two-col>
        <div>
          <Reveal as="p" className="eyebrow">
            05 — Open source
          </Reveal>
          <Reveal as="h2" className="section-title" style={{ fontSize: "clamp(26px, 3vw, 40px)", marginBottom: 18 }}>
            GitHub
          </Reveal>
          <Reveal as="p" className="section-lead" style={{ maxWidth: "44ch", marginBottom: 24 }}>
            Public work, pulled live from the GitHub API. Small and honest — the code here is
            front-end and portfolio work, not the bulk of the job.
          </Reveal>
          <Reveal as="div" className="github-identity">
            <div className="github-avatar grayscale">
              {user?.avatar_url && <img src={user.avatar_url} alt="" />}
            </div>
            <div className="github-identity-text">
              <p className="github-handle">@{profile.github}</p>
              <p className="github-meta">{meta}</p>
            </div>
          </Reveal>
          <a
            ref={profileBtnRef}
            className="btn btn-primary"
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            View GitHub profile
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        </div>

        <div>
          {status === "loading" && (
            <div aria-live="polite" className="github-loading">
              <div className="shimmer-block" />
              <div className="shimmer-block" />
              <p className="loading-label">Loading live GitHub data…</p>
            </div>
          )}

          {status === "error" && (
            <div role="status" className="github-error">
              <p className="github-error-title">Live GitHub data unavailable</p>
              <p className="github-error-msg">{errorMsg}</p>
              <a
                className="btn btn-secondary"
                href={`${profile.githubUrl}?tab=repositories`}
                target="_blank"
                rel="noreferrer"
              >
                Open repositories on GitHub
              </a>
            </div>
          )}

          {status === "ready" && (
            <div>
              <div className="github-figures">
                <div className="figure-cell">
                  <span className="figure-value">{fmt(user?.public_repos)}</span>
                  <span className="figure-label">Public repos</span>
                </div>
                <div className="figure-cell">
                  <span className="figure-value">{totalStars}</span>
                  <span className="figure-label">Stars</span>
                </div>
                <div className="figure-cell">
                  <span className="figure-value">{totalForks}</span>
                  <span className="figure-label">Forks</span>
                </div>
                <div className="figure-cell">
                  <span className="figure-value">{fmt(user?.followers)}</span>
                  <span className="figure-label">Followers</span>
                </div>
              </div>

              {langs.length > 0 && (
                <>
                  <h3 className="sub-label">Language breakdown</h3>
                  <div className="lang-bar">
                    {langs.map((l) => (
                      <span
                        key={l.name}
                        title={`${l.name} ${l.pct.toFixed(1)}%`}
                        style={{ width: `${l.pct}%`, background: colorFor(l.name) }}
                      />
                    ))}
                  </div>
                  <div className="lang-legend">
                    {langs.map((l) => (
                      <span className="lang-chip" key={l.name}>
                        <span className="lang-dot" style={{ background: colorFor(l.name) }} />
                        {l.name} {l.pct.toFixed(1)}%
                      </span>
                    ))}
                  </div>
                </>
              )}

              <h3 className="sub-label">Repositories</h3>
              <div className="repo-list">
                {visibleRepos.map((r) => (
                  <a
                    key={r.id}
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="repo-card"
                  >
                    <span className="repo-card-head">
                      <span className="repo-name">{r.name}</span>
                      <span className="repo-updated">{relativeDate(r.pushed_at)}</span>
                    </span>
                    <span className="repo-desc">
                      {r.description || "No description provided on GitHub."}
                    </span>
                    <span className="repo-meta-row">
                      <span className="repo-meta-item">
                        <span className="lang-dot" style={{ background: colorFor(r.language) }} />
                        {r.language || "—"}
                      </span>
                      <span className="repo-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m12 3 2.9 5.9 6.6.9-4.8 4.6 1.2 6.5L12 17.8 6.1 20.9l1.2-6.5L2.5 9.8l6.6-.9L12 3Z" />
                        </svg>
                        {fmt(r.stargazers_count)}
                      </span>
                      <span className="repo-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="6" cy="5" r="2.5" />
                          <circle cx="18" cy="5" r="2.5" />
                          <circle cx="12" cy="19" r="2.5" />
                          <path d="M6 7.5v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-3M12 13.5v3" />
                        </svg>
                        {fmt(r.forks_count)}
                      </span>
                      <span className="repo-open">
                        Open
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 17 17 7M9 7h8v8" />
                        </svg>
                      </span>
                    </span>
                  </a>
                ))}
              </div>
              <p className="github-footnote">{footnote}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
