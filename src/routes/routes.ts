type RouteT = {
	href: string;
	name: string;
	loggedInD: boolean; // display this route when a user is logged in
};

type RoutesT = {
	[key: string]: RouteT;
};

export const routes: RoutesT = {
	home: { href: '/', name: 'Home', loggedInD: true },
	dashboard: { href: '/dashboard', name: 'Dashboard', loggedInD: true },
	login: { href: '/login', name: 'Login', loggedInD: false },
	register: { href: '/register', name: 'Register', loggedInD: false },
	about: { href: '/about', name: 'About', loggedInD: true }
};
