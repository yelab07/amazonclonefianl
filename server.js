const express = require("express");

const app =
	express();
const server =
	require("http").Server(
		app
	);

const {
	ExpressPeerServer,
} = require("peer");
const peerServer =
	ExpressPeerServer(
		server,
		{
			debug: true,
		}
	);

const {
	v4: uuidV4,
} = require("uuid");
const io =
	require("socket.io")(
		server
	);

app.set(
	"view engine",
	"ejs"
);
app.use(
	express.static(
		"public"
	)
);
app.use(
	"/peerjs",
	peerServer
);

app.get(
	"/",
	(
		req,
		res
	) => {
		res.redirect(
			`/${uuidV4()}`
		);
	}
);
app.get(
	"/:room",
	(
		req,
		res
	) => {
		res.render(
			"room",
			{
				roomId:
					req
						.params
						.room,
			}
		);
	}
);
io.on(
	"connection",
	(
		socket
	) => {
		socket.on(
			"join-room",
			(
				roomId,
				userId
			) => {
				socket.join(
					roomId
				);
				socket.broadcast
					.to(
						roomId
					)
					.emit(
						"user-connected",
						userId
					);
				// messages
				socket.on(
					"message",
					(
						message
					) => {
						//send message to the same room
						io.to(
							roomId
						).emit(
							"createMessage",
							message
						);
					}
				);
			}
		);
	}
);

server.listen(
	process
		.env
		.PORT ||
		3000
);
