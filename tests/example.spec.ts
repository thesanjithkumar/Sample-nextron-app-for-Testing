import { expect, test } from '@playwright/test'
import {
  clickMenuItemById,
  findLatestBuild,
  ipcMainCallFirstListener,
  ipcRendererCallFirstListener,
  parseElectronApp,
  ipcMainInvokeHandler,
  ipcRendererInvoke
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
  await page.waitForSelector('h1')
  const text = await page.$eval('h1', (el) => el.textContent)
  expect(text).toBe('Home Page')
  const title = await page.title()
  expect(title).toBe('Sample Nextron App')
  await page.getByPlaceholder("Name").fill("Sample Name");
  await page.getByPlaceholder("Email").fill("Test@gmail.com");
  await page.getByPlaceholder("Subject").fill("Sample Subject");
  await page.locator('textarea[name="message"]').fill("Sample Notes");
  await page.screenshot({ path: "form.png", fullPage: true })
  await page.getByRole("button", { name: "Submit" }).click();
})

