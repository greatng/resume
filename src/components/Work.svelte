<script lang="ts">
	import Hideable from './Hideable.svelte';

	export let position: string = '';
	export let company: string = '';
	export let url: string = '';
	export let years: string[] = [];
	export let details: string[] = [];
</script>

<div class="work-experience">
	<Hideable>
		{#if company}
			<div class="flex font-bold mb-1 print:mb-0.5">
				<div class="flex-1">
						{company}
				</div>
			</div>
		{/if}
		<div class="flex font-bold mb-2 print:mb-1">
			<div class="flex-1 text-left">{position}</div>
			<div class="flex-1 text-right">{years.join(' - ')}</div>
		</div>
		<ul class="text-left list-disc pl-8 print:pl-6">
			{#each details as detail}
				<Hideable>
					<li>
						{detail}
					</li>
				</Hideable>
			{/each}
		</ul>
	</Hideable>
</div>

<style lang="postcss">
	.work-experience {
		@apply my-4;
	}

	@media print {
		.work-experience {
			@apply my-1;
		}
	}
</style>
