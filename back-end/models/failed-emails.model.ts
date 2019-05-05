import { Document, Schema, model } from "mongoose";

// TODO: Why are we using mongoose? What value do we get from maintaining these schemas?
export const FailedEmailModel = model<PersistedFailedEmail>(
  "failed_emails",
  new Schema(
    {
      recipientEmail: String,
      subject: String,
      html: String
    },
    {
      usePushEach: true
    }
  )
);

export type PersistedFailedEmail = {
  recipientEmail: string;
  subject: string;
  html: string;
} & Document;
