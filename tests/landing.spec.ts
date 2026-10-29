import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('page is responsive and navigation reaches pricing', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('/')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  )
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Less busywork.')
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open menu', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'Pricing', exact: true })
      .click()
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0)
  } else {
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Pricing', exact: true })
      .click()
  }
  await expect(page).toHaveURL(/#pricing$/)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  )
  expect(errors).toEqual([])
})

for (const colorScheme of ['light', 'dark'] as const) {
  test(`${colorScheme} page and signup dialog have no automated WCAG A/AA violations`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce', colorScheme })
    await page.goto('/')
    const pageAudit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(pageAudit.violations).toEqual([])
    await page.locator('.hero-actions').getByRole('button', { name: 'Find your flow' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    const modalAudit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(modalAudit.violations).toEqual([])
  })
}

test('theme follows the system and remembers an explicit choice', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Dark mode', exact: true })
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(toggle).toHaveAttribute('aria-pressed', 'false')
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await page.reload()
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#0e1422')
  await toggle.click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('theme remains usable when browser storage is blocked', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Storage blocked', 'SecurityError')
      },
    })
  })
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Dark mode', exact: true })
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('layout fits narrow phones through wide desktops', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  for (const width of [320, 375, 390, 600, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      `Overflow at ${width}px`,
    ).toBeLessThanOrEqual(width)
  }
})

test('pricing changes billing and signup clearly simulates submission', async ({ page }) => {
  await page.goto('/')
  const pricing = page.locator('#pricing')
  await expect(pricing).toContainText('$144 per person, billed yearly.')
  await pricing.getByRole('button', { name: 'Monthly', exact: true }).click()
  await expect(pricing.locator('.plan-price').nth(1)).toContainText('16')
  await expect(pricing).not.toContainText('$144 per person')
  await pricing.getByRole('button', { name: 'Try Team for free' }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toContainText('Simulated submission only')
  await dialog.getByLabel('Your name').fill('Demo Person')
  await dialog.getByLabel('Email address').fill('demo@example.com')
  await dialog.getByRole('button', { name: 'Try the demo signup' }).click()
  await expect(dialog.getByRole('status')).toContainText('No details were sent or stored')
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(pricing.getByRole('button', { name: 'Try Team for free' })).toBeFocused()
})

test('workspace supports creating, finding, completing, and resetting a task', async ({ page }) => {
  await page.goto('/')
  const demo = page.locator('#product-demo')
  await demo.getByRole('button', { name: 'Add task', exact: true }).click()
  await page.getByRole('dialog').getByLabel('Task name').fill('Prepare a portfolio case study')
  await page.getByRole('dialog').getByRole('button', { name: 'Create demo task' }).click()
  await demo.getByLabel('Search demo tasks').fill('portfolio case study')
  await expect(demo.locator('.task-card')).toHaveCount(1)
  await demo.locator('.task-card').click()
  await page.getByRole('dialog').getByRole('button', { name: 'Mark as complete' }).click()
  await expect(demo.locator('.task-done')).toContainText('Prepare a portfolio case study')
  await demo.getByRole('button', { name: 'List', exact: true }).click()
  await expect(demo.locator('.task-list')).toContainText('Done')
  await page.reload()
  await demo.getByLabel('Search demo tasks').fill('portfolio case study')
  await expect(demo.locator('.task-card')).toHaveCount(0)
})

test('FAQ and contact have accessible, functional states', async ({ page }) => {
  await page.goto('/')
  const question = page.getByRole('button', { name: 'What happens when I submit a form?' })
  await question.click()
  await expect(question).toHaveAttribute('aria-expanded', 'true')
  await expect(
    page.getByRole('region', { name: 'What happens when I submit a form?' }),
  ).toContainText('simulated confirmation')
  const contact = page.locator('#contact')
  await contact.getByLabel('Your name').fill('Demo Person')
  await contact.getByLabel('Email address').fill('demo@example.com')
  await contact
    .getByLabel('What are you working on?')
    .fill('A sample creative project for a fictional studio.')
  await contact.getByRole('button', { name: 'Send a demo message' }).click()
  await expect(contact.getByRole('status')).toContainText('No message was sent')
  await contact.getByRole('button', { name: 'Try the form again' }).click()
  await expect(contact.getByLabel('Your name')).toBeEmpty()
})
