import { describe, expect, it } from 'vitest';
import profile from '../static/data/profile.json';
import type { IProfileResp } from './types';

const resume: IProfileResp = profile;

describe('published résumé data', () => {
	it('provides an identity, summary, and valid contact links', () => {
		expect(resume.intro.name.trim()).not.toBe('');
		expect(resume.intro.summary.trim()).not.toBe('');
		expect(resume.intro.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
		expect(new URL(resume.resumeUrl.fullVersionLink).protocol).toBe('https:');
	});

	it('keeps every role attributable and dated', () => {
		expect(resume.workExperiences.length).toBeGreaterThan(0);
		for (const job of resume.workExperiences) {
			expect(job.position.trim()).not.toBe('');
			expect(job.company.trim()).not.toBe('');
			expect(job.years).toHaveLength(2);
			expect(job.details.length).toBeGreaterThan(0);
			if (job.url) expect(new URL(job.url).protocol).toBe('https:');
		}
	});
});
