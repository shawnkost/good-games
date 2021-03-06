insert into "users" ("username", "email", "password")
values ('DemoUser', 'demo@goodgames.com', '$argon2i$v=19$m=4096,t=3,p=1$c5eQk7pYGADvDmaL0VlpQg$WMKvT/q0urSh6eYnmCYmaLbF1+tNy3RQsjdrwB82/TA');

insert into "reviews" ("gameId", "gameTitle", "details", "userId")
values ('28', 'Red Dead Redemption 2', 'The story telling of the game is top notch and the atmosphere is great, but I bought this game after sinking tons of time into the original
Red Dead so that was expected. What was not expected was just how completely awful the controls and mechanics of this game are. The gun fighting felt clunky and underdeveloped,
gunfights without cover are pointless because the enemies demolish you, NPCs start fights with you and shoot if you accidentally get in their way on the road, the main
character needs to play fetch and do chores after every mission, and the home camp is apparently completely incapable of doing anything for themselves.
The worst part is that I will bet the cost of the game that once online comes out single player wont get a single update to fix the clear and present issues. As is,
this game deserves nowhere near a 97 rating and it is pretty clear how and why it is getting that kind of rating.', '1');

insert into "reviews" ("gameId", "gameTitle", "details", "userId")
values ('22511', 'The Legend of Zelda: Breath of the Wild', 'Simply Amazing. Nuff said. This is the best game I''ve played in this entire generation of hardware.
The game is beautiful, combat is fun, the shrines have been delightful- I''m very, very impressed.', '1');

insert into "reviews" ("gameId", "gameTitle", "details", "userId")
values ('392019', 'Half-Life: Alyx', 'Definitely on of the best vr games I''ve ever seen, it has beautiful graphics and an engaging story.', '1');

insert into "gameList" ("userId", "gameId", "wantToPlay", "played")
values ('1', '28', 'false', 'true');
insert into "gameList" ("userId", "gameId", "wantToPlay", "played")
values ('1', '22511', 'false', 'true');
insert into "gameList" ("userId", "gameId", "wantToPlay", "played")
values ('1', '392019', 'false', 'true');
