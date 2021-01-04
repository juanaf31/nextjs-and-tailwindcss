import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import Link from 'next/link';

function Navbar() {
	const [ isOpen, setIsOpen ] = useState(false);
	const size = useWindowSize();
	useEffect(
		() => {
			if (size.width > 640) {
				setIsOpen(false);
			}
		},
		[ size ]
	);
	const handleShowMenu = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div>
			<header className="flex justify-between items-center bg-white p-3">
				<img src={logo} className="w-10" alt="logo" />
				<nav className="pr-5 hidden sm:block md:block lg:block">
					<ul className="flex justify-evenly items-center">
						<li className="no-underline font-medium text-sm px-3 text-gray-500">
							<Link href="/">Home</Link>
						</li>
						<li className="no-underline font-medium text-sm text-gray-500 px-3">
							<Link href="/about">About</Link>
						</li>
						<li className="no-underline font-medium text-sm text-gray-500 px-3">
							<Link href="contact">Contact</Link>
						</li>
					</ul>
				</nav>
				<div className="block sm:hidden md:hidden lg:hidden cursor-pointer" onClick={handleShowMenu}>
					<div
						className={
							isOpen ? (
								'w-5 h-0.5 m-1 bg-gray-500 transform rotate-45 -translate-x-0.5 translate-y-0.5'
							) : (
								'w-5 h-0.5 m-1 bg-gray-500'
							)
						}
					/>
					<div className={isOpen ? 'opacity-0' : 'w-5 h-0.5 m-1 bg-gray-500'} />
					<div
						className={
							isOpen ? (
								'w-5 h-0.5 m-1 bg-gray-500 transform -rotate-45 -translate-x-0.5 -translate-y-1'
							) : (
								'w-5 h-0.5 m-1 bg-gray-500'
							)
						}
					/>
				</div>
			</header>
			<div className={isOpen ? 'absolute bg-gray-600 w-full' : 'hidden'}>
				<ul className="flex justify-evenly flex-col items-center">
					<li className="no-underline font-medium text-sm px-3 text-white">
						<Link href="/">Home</Link>
					</li>
					<li className="no-underline font-medium text-sm text-white">
						<Link href="/about">About</Link>
					</li>
					<li className="no-underline font-medium text-sm text-white">
						<Link href="contact">Contact</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Navbar;

function useWindowSize() {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [ windowSize, setWindowSize ] = useState({
		width: undefined,
		height: undefined
	});

	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight
			});
		}

		// Add event listener
		window.addEventListener('resize', handleResize);

		// Call handler right away so state gets updated with initial window size
		handleResize();

		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleResize);
	}, []); // Empty array ensures that effect is only run on mount

	return windowSize;
}
