/*
 * Portfolio analytics. Add the public PostHog project token and matching API host
 * below. Cookieless server hash mode must also be enabled in PostHog project
 * settings before events will be accepted.
 */
(function () {
  const PROJECT_TOKEN = "";
  const API_HOST = "";
  const SITE_HOST = "choudharyayan.github.io";

  // Keep local previews and unconfigured deployments out of the dashboard.
  if (location.hostname !== SITE_HOST || !/^phc_[A-Za-z0-9_-]+$/.test(PROJECT_TOKEN)) return;
  if (!/^https:\/\/(us|eu)\.i\.posthog\.com$/.test(API_HOST)) return;

  // PostHog's official HTML snippet queues events while its SDK loads.
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog&&window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}p||((p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",p.onerror=function(){p=null},(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r));var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  posthog.init(PROJECT_TOKEN, {
    api_host: API_HOST,
    defaults: "2026-05-30",
    cookieless_mode: "always",
    person_profiles: "never",
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: true
  });

  function capture(name, properties) {
    posthog.capture(name, properties);
  }

  document.addEventListener("click", function (event) {
    if (!(event.target instanceof Element)) return;
    const control = event.target.closest("a, button");
    if (!control) return;

    if (control.matches(".filter[data-filter]")) {
      capture("feed_filter_selected", { filter: control.dataset.filter });
    }

    const card = control.closest(".feed-card");
    if (card && control.matches("a")) {
      capture("feed_item_clicked", {
        item_type: card.classList.contains("feed-card-article") ? "article" : "build",
        item_title: card.querySelector("h3")?.textContent?.trim() || "Unknown",
        link_label: control.textContent.trim(),
        link_kind: control.classList.contains("card-secondary-link") ? "secondary" : "primary"
      });
    }

    if (control.matches("a[download]")) {
      capture("portfolio_download_clicked", {
        file_name: control.getAttribute("href")?.split("/").pop() || "Unknown"
      });
    }

    if (control.matches("a[href]")) {
      const destination = new URL(control.href, location.href);
      if (destination.protocol === "https:" && destination.hostname !== location.hostname) {
        capture("outbound_link_clicked", {
          destination_host: destination.hostname,
          link_label: control.textContent.trim().slice(0, 80),
          source_path: location.pathname
        });
      }
    }
  });

  if (location.pathname === "/" || location.pathname === "/index.html") {
    const sections = ["journey", "feed"].map((id) => document.getElementById(id)).filter(Boolean);
    if ("IntersectionObserver" in window && sections.length) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          capture("homepage_section_viewed", { section: entry.target.id });
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.05 });
      sections.forEach((section) => observer.observe(section));
    }
  }
})();
