import { expect, test } from '@playwright/test';
import profile from '../static/data/profile.json' with { type: 'json' };

test('renders the résumé, real experience, and contact links', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.goto('/');
	await expect(page).toHaveTitle(`${profile.intro.name} — ${profile.intro.title}`);
	await expect(page.getByRole('heading', { level: 1 })).toContainText(
		profile.intro.name.split(' ')[0]
	);
	await expect(page.getByRole('article')).toHaveCount(profile.workExperiences.length);
	await expect(page.getByRole('article').first()).toContainText('Senior Software Engineer');
	await expect(page.getByRole('article').nth(1)).toContainText('10% reduction in CPU usage');
	await expect(page.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
		'href',
		'https://www.linkedin.com/in/paphawit/'
	);
	await expect(page.getByRole('link', { name: /paphawit.ng@gmail.com/ })).toHaveAttribute(
		'href',
		'mailto:paphawit.ng@gmail.com'
	);
	expect(errors).toEqual([]);
});

test('résumé content is server rendered without JavaScript', async ({ browser }) => {
	const context = await browser.newContext({ javaScriptEnabled: false });
	try {
		const page = await context.newPage();
		await page.goto('http://127.0.0.1:4173');
		await expect(page.getByRole('article').first()).toContainText(
			profile.workExperiences[0].company
		);
		await expect(page.getByRole('heading', { name: 'Education', exact: true })).toBeVisible();
	} finally {
		await context.close();
	}
});

test('mobile layout fits the viewport and navigation works', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
		true
	);
	await expect(page.getByRole('button', { name: 'Print / Save PDF' })).toBeVisible();
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.getByRole('navigation').getByRole('link', { name: 'Education' }).click();
	await expect(page).toHaveURL(/#education$/);
});

test('print control opens printing and print layout keeps all career content', async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => {
		window.print = () => document.documentElement.setAttribute('data-print-requested', 'true');
	});
	await page.getByRole('button', { name: 'Print / Save PDF' }).click();
	await expect(page.locator('html')).toHaveAttribute('data-print-requested', 'true');
	await page.emulateMedia({ media: 'print' });
	await expect(page.getByRole('button', { name: 'Print / Save PDF' })).toBeHidden();
	await expect(page.getByRole('navigation')).toBeHidden();
	await expect(page.getByRole('heading', { name: /A little curiosity/ })).toBeHidden();
	await expect(page.locator('.print-contact')).toBeVisible();
	for (const article of await page.getByRole('article').all()) await expect(article).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Certifications', exact: true })).toBeVisible();
	const pdf = await page.pdf({ format: 'A4', preferCSSPageSize: true });
	expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
});
