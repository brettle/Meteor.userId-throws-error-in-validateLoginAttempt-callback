if (Meteor.isClient) {
    Template.body.events({
        'click .correct': function () {
            console.log('in click .correct callback');
            Meteor.loginWithPassword('test', 'correct');
        },
        'click .incorrect': function () {
            Meteor.loginWithPassword('test', 'incorrect');
        }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
     // Create a test user if there isn't one already.
    if (!Meteor.users.findOne({username: 'test'})) {
        Accounts.createUser({
            username: 'test',
            email: 'test@example.com',
            password: "correct",
            profile: {name: "Test User"}
        });
    }
    Accounts.validateLoginAttempt(function (attempt) {
        try {
            var loggedInUserId = Meteor.userId();
        } catch (e) {
            console.log("In validateLoginAttempt callback:\n" +
            "  Meteor.userId() throws: " + e + "\n" +
            "  this.userId: " + this.userId);
        }
        return true;
    });

    Accounts.onLogin(function (attempt) {
        try {
            var loggedInUserId = Meteor.userId();
        } catch (e) {
            console.log("In onLogin callback:\n" +
            "  Meteor.userId() throws: " + e + "\n" +
            "  this.userId: " + this.userId);
        }
    });

    Accounts.onLoginFailure(function (attempt) {
        try {
            var loggedInUserId = Meteor.userId();
        } catch (e) {
            console.log("In onLoginFailure callback:\n" +
            "  Meteor.userId() throws: " + e + "\n" +
            "  this.userId: " + this.userId);
        }
    });
  });
}
