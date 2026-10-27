<script lang="ts">
	import type { IProfileResp } from '../types';
	import ArrowUpRight from './ArrowUpRight.svelte';

	export let profile: IProfileResp;
	const sections = [
		{ id: 'experience', label: 'Experience' },
		{ id: 'expertise', label: 'Expertise' },
		{ id: 'education', label: 'Education' }
	];
</script>

<svelte:head>
	<title>{profile.intro.name} — {profile.intro.title}</title>
	<meta name="description" content={profile.intro.summary} />
	<meta name="theme-color" content="#f5f4ef" />
</svelte:head>

<div class="site-shell">
	<header class="site-header screen-only">
		<a class="wordmark" href="#top" aria-label="Back to top">great<span>.</span></a>
		<nav aria-label="Résumé sections">
			{#each sections as section}
				<a href="#{section.id}">{section.label}</a>
			{/each}
		</nav>
		<button class="print-button" on:click={() => window.print()}>
			<svg
				viewBox="0 0 24 24"
				width="16"
				height="16"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				aria-hidden="true"
				><path d="M7 8V3h10v5M7 17H4V9h16v8h-3M7 14h10v7H7z" /><path d="M17 11h.01" /></svg
			>
			<span>Print / Save PDF</span>
		</button>
	</header>

	<main id="top">
		<section class="hero" aria-labelledby="name">
			<div class="hero-copy">
				<p class="eyebrow">
					<span class="status-dot" aria-hidden="true"></span>
					{profile.intro.title} <span class="eyebrow-divider">/</span>
					{profile.intro.location}
				</p>
				<h1 id="name">
					{profile.intro.name.split(' ')[0]}<br /><span
						>{profile.intro.name.split(' ').slice(1).join(' ')}<span class="name-dot">.</span></span
					>
				</h1>
				<p class="intro-summary">{profile.intro.summary}</p>
				<div class="hero-contact">
					<a class="email-link" href="mailto:{profile.intro.email}"
						>{profile.intro.email} <span aria-hidden="true"><ArrowUpRight /></span></a
					>
					<span class="contact-divider" aria-hidden="true"></span>
					<a
						href="https://www.linkedin.com/in/{profile.intro.linkedin}/"
						target="_blank"
						rel="noreferrer">LinkedIn <span aria-hidden="true"><ArrowUpRight /></span></a
					>
					<a href="https://github.com/{profile.intro.github}" target="_blank" rel="noreferrer"
						>GitHub <span aria-hidden="true"><ArrowUpRight /></span></a
					>
				</div>
				<div class="print-contact print-only">
					{profile.intro.phone} · {profile.intro.email} · {profile.intro.website}<br
					/>linkedin.com/in/{profile.intro.linkedin} · github.com/{profile.intro.github} · {profile
						.intro.location}
				</div>
			</div>
			<aside class="hero-note screen-only" aria-label="Current role">
				<span class="note-index">01 / CURRENTLY</span>
				<div class="note-line"></div>
				<p>Engineering at<br /><strong>{profile.workExperiences[0].company}</strong></p>
				<span class="note-foot">Financial technology. Human impact.</span>
			</aside>
		</section>

		<div class="resume-body">
			<section
				id="experience"
				class="resume-section experience"
				aria-labelledby="experience-heading"
			>
				<div class="section-heading">
					<span class="section-number">01</span>
					<h2 id="experience-heading">Experience</h2>
					<span class="section-caption screen-only">THE WORK SO FAR</span>
				</div>
				<div class="timeline">
					{#each profile.workExperiences as job, index}
						<article class="job" class:current={index === 0}>
							<div class="job-meta">
								<span class="timeline-dot" aria-hidden="true"></span>
								<p class="job-dates">{job.years[0]} — {job.years[1]}</p>
								{#if index === 0}<span class="current-label screen-only">CURRENT ROLE</span>{/if}
							</div>
							<div class="job-content">
								<h3>{job.position}</h3>
								<p class="company">
									{#if job.url}<a href={job.url} target="_blank" rel="noreferrer"
											>{job.company}<span aria-hidden="true" class="screen-only">
												<ArrowUpRight /></span
											></a
										>{:else}{job.company}{/if}
								</p>
								<ul>
									{#each job.details as detail}<li>{detail}</li>{/each}
								</ul>
							</div>
						</article>
					{/each}
				</div>
			</section>

			<aside class="sidebar">
				<section id="expertise" class="resume-section" aria-labelledby="expertise-heading">
					<div class="section-heading">
						<span class="section-number">02</span>
						<h2 id="expertise-heading">Expertise</h2>
					</div>
					{#each profile.technologies as technology}
						<div class="skill-group">
							<h3>{technology.section.replace(':', '')}</h3>
							<div class="skill-tags">
								{#each technology.details.split(', ') as skill}<span>{skill}</span>{/each}
							</div>
						</div>
					{/each}
				</section>
				<section id="education" class="resume-section" aria-labelledby="education-heading">
					<div class="section-heading">
						<span class="section-number">03</span>
						<h2 id="education-heading">Education</h2>
					</div>
					{#each profile.educations as education}<div class="education">
							<h3>{education.head}</h3>
							<p>{education.details}</p>
						</div>{/each}
				</section>
				<section class="resume-section" aria-labelledby="certifications-heading">
					<div class="section-heading">
						<span class="section-number">04</span>
						<h2 id="certifications-heading">Certifications</h2>
					</div>
					{#each profile.certificates as certificate}<div class="certificate">
							<span class="certificate-icon screen-only" aria-hidden="true">✧</span>
							<div>
								<h3>{certificate.name}</h3>
								<p>{certificate.year}</p>
							</div>
						</div>{/each}
				</section>
				<section class="resume-section" aria-labelledby="languages-heading">
					<div class="section-heading">
						<span class="section-number">05</span>
						<h2 id="languages-heading">Languages</h2>
					</div>
					<dl class="languages">
						{#each profile.languages as language}<div>
								<dt>{language.language}</dt>
								<dd>
									{language.level}{#if language.details}<small>{language.details}</small>{/if}
								</dd>
							</div>{/each}
					</dl>
				</section>
				<section class="beyond-work screen-only" aria-labelledby="beyond-heading">
					<p class="eyebrow">AWAY FROM THE KEYBOARD</p>
					<h2 id="beyond-heading">A little curiosity<br />goes a long way.</h2>
					<p>Photography, aviation, cooking, and the occasional strategy game.</p>
					<a href="https://{profile.intro.website}" target="_blank" rel="noreferrer"
						>More about me <span aria-hidden="true"><ArrowUpRight /></span></a
					>
				</section>
			</aside>
		</div>
	</main>
	<footer class="site-footer screen-only">
		<a class="wordmark" href="#top">great<span>.</span></a>
		<p>Built with care. Always learning.</p>
		<a href="mailto:{profile.intro.email}"
			>Let’s connect <span aria-hidden="true"><ArrowUpRight /></span></a
		>
	</footer>
</div>
