<script lang="ts">
	import { onMount } from 'svelte';
	import type { IProfileResp } from '../types';
	import Hideable from './Hideable.svelte';
	import Intro from './Intro.svelte';
	import Work from './Work.svelte';

	let profile: IProfileResp;

	$: dataLink = `${sourceLink}/blob/main/static/data/profile.json`;
	$: ({
		intro = {} as IProfileResp['intro'],
		technologies = [],
		languages = [],
		workExperiences = [],
		educations = [],
		interests = [],
		resumeUrl: { sourceLink = '', fullVersionLink = '' } = {},
		certificates = [],
	} = profile || {});

	onMount(async () => (profile = await fetchResumeProfile()));

	async function fetchResumeProfile() {
		const resp = await fetch('/data/profile.json');
		return await resp.json();
	}
</script>

<!-- Remove this is you does not want Kofi widget on your site -->
<!-- {#if intro.github == 'narze'}
	<Kofi name={intro.github} />
{/if} -->

<header class="web-only text-center p-4 sm:p-6 bg-green-400 text-white w-screen">
	<h1 class="text-4xl">Resumette</h1>
	<h3>
		<button on:click={() => window.print()} class="underline text-lg">[Print]</button>
	</h3>
	<p>
		Printer-friendly standard résumé, any HTML tags with <code>web-only</code> CSS class will be hidden
		on print.
	</p>
	<p>You can click at any sections or lines hide some information before printing.</p>
	<a href={sourceLink} target="_blank" rel="noopener">[Source]</a>
	<a href={dataLink} target="_blank" rel="noopener">[Data]</a>
</header>

<main class="text-center p-4 m-0 md:m-8 xl:mx-auto max-w-screen-xl">
	<Intro {...intro} />

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-4xl uppercase text-left">Technologies</h2>
			<hr />
			<ul class="text-left list-disc pl-8">
				{#each technologies as tech}
					<Hideable>
						<li>
							<span class="w-28 inline-block">{tech.section}</span>
							<span>{tech.details}</span>
						</li>
					</Hideable>
				{/each}
			</ul>
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-4xl uppercase text-left">Languages</h2>
			<hr />
			<ul class="text-left list-disc pl-8">
				{#each languages as lang}
					<Hideable>
						<li>
							<span class="w-28 inline-block">{lang.language}</span>
							<span>{lang.level}</span>
							{#if lang.details}
								<span>({lang.details})</span>
							{/if}
						</li>
					</Hideable>
				{/each}
			</ul>
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-4xl uppercase text-left">Education</h2>
			<hr />

			<ul class="text-left list-disc pl-8">
				{#each educations as edu}
					<Hideable>
						<li>
							<strong>{edu.head}</strong>, {edu.details}
						</li>
					</Hideable>
				{/each}
			</ul>
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-4xl uppercase text-left">Work Experience</h2>
			<hr />

			{#each workExperiences as exp}
				<Work {...exp} />
			{/each}
		</Hideable>
	</section>

	{#if certificates?.length}
	<section>
		<Hideable>
			<h2 class="text-2xl print:text-4xl uppercase text-left">Certificates</h2>
			<hr />

			<ul class="text-left list-disc pl-8">
				{#each certificates as certificate}
					<Hideable hide={certificate.hide}>
						<li>
							<strong>{certificate.name}</strong>
							- {certificate.year}
						</li>
					</Hideable>
				{/each}
			</ul>
		</Hideable>
	</section>
	{/if}

	<section>
		<Hideable>
			<h2 class="text-2xl print:text-4xl uppercase text-left">Interests</h2>
			<hr />

			<ul class="text-left list-disc pl-8">
				{#each interests as interest}
					<Hideable>
						<li>
							{interest}
						</li>
					</Hideable>
				{/each}
			</ul>
		</Hideable>
	</section>

	<footer class="print-only">
		(See <a href={fullVersionLink} target="_blank" rel="noopener">full version</a>
		or <a href={sourceLink} target="_blank" rel="noopener">source</a>)
	</footer>
</main>

<style lang="postcss">
	main {
		overflow-x: hidden;
	}

	a {
		text-decoration: underline;
	}

	section {
		@apply my-4;
	}

	section h2 {
		@apply font-semibold;
	}

	section hr {
		@apply mt-0 mb-2;
		border-color: darkgrey;
	}

	:global(.print-only) {
		display: none;
	}

	@media print {
		* {
			@apply text-xs;
		}

		:global(.print-only) {
			display: inherit;
		}

		:global(.web-only) {
			display: none;
		}

		ul {
			@apply pl-6;
		}

		section {
			@apply my-2;
		}

		section hr {
			@apply mt-0 mb-1;
		}

		main {
			margin: 0 0;
			padding: 0;
		}
	}
</style>
