import { expect, test } from '@playwright/test'
import {
  findLatestBuild,
  parseElectronApp,

} from 'electron-playwright-helpers'

import { ElectronApplication, Page, _electron as electron } from 'playwright'

let electronApp: ElectronApplication

test.beforeAll(async () => {
  // find the latest build in the out directory
  const latestBuild = findLatestBuild()
  // parse the directory and find paths and other info
  const appInfo = parseElectronApp(latestBuild)
  // set the CI environment variable to true
  process.env.CI = 'e2e'
  electronApp = await electron.launch({
    args: [appInfo.main],
    executablePath: appInfo.executable
  })
  electronApp.on('window', async (page) => {
    const filename = page.url()?.split('/').pop()
    console.log(`Window opened: ${filename}`)

    // capture errors
    page.on('pageerror', (error) => {
      console.error(error)
    })
    // capture console messages
    page.on('console', (msg) => {
      console.log(msg.text())
    })
  })

})

test.afterAll(async () => {
  await electronApp.close()
})



let page: Page

test('renders the first page', async () => {
  page = await electronApp.firstWindow()
  const title = await page.title()
  expect(title).toBe('Home Page')
  await page.getByPlaceholder("Name").fill("Sample Name");
  await page.waitForTimeout(1000);
  await page.getByPlaceholder("Email").fill("Test@gmail.com");
  await page.waitForTimeout(1000);
  await page.getByPlaceholder("Subject").fill("Sample Subject");
  await page.waitForTimeout(1000);
  await page.locator('textarea[name="message"]').fill("Sample Notes");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "form.png", fullPage: true })
  await page.getByRole("button", { name: "Submit" }).click();
})

test('Todo Page', async () => {
  const task = process.env.npm_config_task || "Sample Name"
  const completedTask = process.env.npm_config_completedTask || "Sample Name"
  page = await electronApp.firstWindow()
  await page.getByRole("link", { name: "Todo" }).click();
  const title = await page.title()
  expect(title).toBe('Todo Page')
  await page.getByPlaceholder("Add a new task").fill(task);
  await page.waitForTimeout(3000);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);
  await page.getByText(new RegExp(`${completedTask}xComplete`)).getByRole('button', { name: 'Complete' }).click();
  await page.waitForTimeout(3000);
})