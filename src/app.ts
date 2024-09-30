import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";

const server = new SMTPServer({

  authOptional: true,

  onData(stream, session, callback) {
    console.log(session.id);
    
    simpleParser(stream)
      .then((parsed) => {
        console.log(JSON.stringify(parsed, null, 1))
      })
      .catch((err) => {
        console.error("Error parsing email:", err);
      })
      .finally(() => {
        callback();
      });
  },

});

server.listen(2525, () => {
  console.log("SMTP server is running on port 25");
});
