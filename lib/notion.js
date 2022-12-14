"use strict";

import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getPagesFromDatabase = async (databaseId) => {
  try {
    return await notion.databases.query({
      database_id: databaseId,
    });
  } catch (e) {
    console.error(e);
  }
};

export const addPageToDatabase = async (databaseId, text) => {
  try {
    const response = await notion.request({
      path: "pages",
      method: "post",
      body: {
        parent: { database_id: databaseId },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: text,
                },
              },
            ],
          },
        },
      },
    });

    const pageID = response.id.replace(/-/g, "");

    response.pageURL = `https://notion.so/${databaseId}?p=${pageID}`;

    return response;
  } catch (e) {
    console.error(e);
  }
};

export const appendContentToPage = async (text) => {
    const blockId = process.env.PAGE_ID || ''

    const response = await notion.blocks.children.append({
      block_id: blockId,
      children: [
        {
          "paragraph": {
            "rich_text": [
              {
                "text": {
                  "content": text,
                }
              }
            ]
          }
        }
      ],
    });
  console.log(response);
}



  // const pageTestId = "645abe3b-2ef2-412f-bde7-9aa117a4c800"
//      const pageTestId = "9fa58cc8-2483-4067-a9c3-ead9b3123a51"
//   console.debug("🚀 ~ appendContentToPage ~ pageTestId", pageTestId)
  
//   try {
//     return await notion.blocks.children.append({
//       block_id: pageTestId,
//       children: [
//         {
//           "paragraph": {
//             "rich_text": [
//               {
//                 "text": {
//                   "content": text,
//                 }
//               }
//             ]
//           }
//         }
//       ],
//     });
//   } catch (e) {
//     console.error(e);
//   }
// };
