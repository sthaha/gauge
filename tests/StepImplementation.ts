
import { openBrowser,write, closeBrowser, goto,
  press, screenshot, text, focus,
  textBox, toRightOf } from "taiko";

import { Gauge, AfterSuite, BeforeSuite, Step, CustomScreenGrabber } from "gauge-ts";
import { equal, ok } from "assert";

const headless = (process.env["headless_chrome"] || "true").toLowerCase() === 'true';

export default class StepImplementation {

    @BeforeSuite()
    public async init() {
      await openBrowser({ headless })
    }

    @AfterSuite()
    public async cleanup() {
      await closeBrowser()
    }

    @CustomScreenGrabber()
    public async screenshot() {
      return await screenshot({ encoding: 'base64' });
    }

    @Step("goto gauge page")
    public async gotoGuage() {
      await goto('https://github.com/getgauge');
    }

    @Step("search for <query>")
    public async search(query: string) {
        await focus(textBox(toRightOf('Pricing')))
        await write(query);
        await Gauge.captureScreenshot()
        await press('Enter');
    }

    @Step("page must contain <content>")
    public async hasContent(content: string) {
      ok(await text(content).exists());
    }

}

