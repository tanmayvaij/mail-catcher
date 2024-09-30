import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";

const server = new SMTPServer({

  authOptional: true,

  onConnect(session, callback) {
      console.log(`on connect called:- ${session.id}`);
      callback()
  },

  onMailFrom(address, session, callback) {
    console.log(`on main from called:- ${session.id} ${address.address}`);
    callback() 
  },

  onRcptTo(address, session, callback) {
    console.log(`on receive to called:- ${session.id} ${address.address}`);
    callback() 
  },

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
  console.log("SMTP server is running on port 2525");
});
