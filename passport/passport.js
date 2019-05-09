const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('../models');
module.exports = function(passport) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: '875458346343-je11hqka0q7uk6nrh57c65e8rfsei8h4.apps.googleusercontent.com',
				clientSecret: 'RuKgs2LPdCDsEHRwBcoQwD4B',
				callbackURL: '/auth/google/callback'
			},
			function(accessToken, refreshToken, profile, done) {
				const newUser = {
					GoogleID: profile.id,
					firstName: profile.name.givenName,
					lastName: profile.name.familyName,
					emailAddress: profile.emails[0].value,
					photo: profile.photos[0].value
				};

				db.User
					.findAll({
						where: {
							GoogleID: newUser.GoogleID
						}
					})
					.then((user) => {
						if (user[0]) {
							//return USER
							done(null, newUser);

						} else {
							db.User.create(newUser).then((user) => {

								done(null, user);
							});
						}
					})
					.catch((err) => console.log(err));
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user);
	});
	passport.deserializeUser((user, done) => {

		done(null, user);
	});
};
