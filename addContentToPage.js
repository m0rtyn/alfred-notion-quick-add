"use strict";

import alfy from "alfy";
import alfredNotifier from "alfred-notifier";
import { appendContentToPage } from "./lib/notion";

alfredNotifier();

await appendContentToPage(alfy.input);

console.log(
  JSON.stringify({
    alfredworkflow: {
      variables: { pageURL: process.env.pageURL },
    },
  })
);
