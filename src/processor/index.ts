import type { Linter } from "eslint"
import type { Shared } from "../shared"
import { beginShared, terminateShared } from "../shared"
export const processor = {
  preprocess(code: string, filename: string): string[] {
    if (filename) {
      beginShared(filename)
    }

    return [code]
  },

  postprocess(
    [messages]: Linter.LintMessage[][],
    filename: string,
  ): Linter.LintMessage[] {
    const shared = terminateShared(filename)
    if (shared) {
      return filter(messages, shared)
    }

    return messages
  },

  supportsAutofix: true,
}

/** Filter  */
function filter(
  messages: Linter.LintMessage[],
  shared: Shared,
): Linter.LintMessage[] {
  if (shared.commentDirectives.length === 0) {
    return messages
  }
  let filteredMessages = messages
  for (const cd of shared.commentDirectives) {
    filteredMessages = cd.filterMessages(filteredMessages)
  }
  return filteredMessages
}
