import { json } from "@remix-run/node";

import { GET } from "shared/api";

export const loader = async () => {
  const { data: articles, error, response } = await GET("/articles");

  if (error) {
    throw json(error, { status: response.status });
  }

  return json({ articles });
};
