
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

    // these are manual steps
    // change throw to ok(true) to make the step as done

    @Step("go to foobar")
    public async implementation102b27fb9628329d6783() {
      ok(true)
      //throw new Error("Method not implemented.");
    }

    @Step("do this and that")
    public async implementationde012a8914ebcb195a27() {
      ok(true)
      //throw new Error("Method not implemented.");
    }
    @Step("ensure it works")
    public async implementationb330326aa83df2ed3821() {
      throw new Error("Method not implemented.");
    }

}

