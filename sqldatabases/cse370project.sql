-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 25, 2023 at 07:27 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cse370project`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_anime`
--

CREATE TABLE `add_anime` (
  `listid` int(11) NOT NULL,
  `animename` varchar(255) NOT NULL,
  `watchlist_status` varchar(255) NOT NULL DEFAULT 'currently watching'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `add_anime`
--

INSERT INTO `add_anime` (`listid`, `animename`, `watchlist_status`) VALUES
(21301705, 'Haikyuu', 'finished'),
(21301705, 'One piece', 'currently watching');

-- --------------------------------------------------------

--
-- Table structure for table `anime`
--

CREATE TABLE `anime` (
  `animeid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `studio` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `poster_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `anime`
--

INSERT INTO `anime` (`animeid`, `name`, `studio`, `start_date`, `description`, `genre`, `poster_url`) VALUES
(1, 'Haikyuu', 'aniplex', '2013-08-01', 'funsies', 'sports', NULL),
(2, 'One piece', 'mapa', '2013-08-09', 'funnn', 'adventure', NULL),
(3, 'Attack on Titan', 'Wit Studio', '2013-04-06', 'In a world where humanity resides within enormous walled cities, protecting themselves from Titans.', 'Action, Drama', 'https://m.media-amazon.com/images/I/81dH7-pkjiL.jpg'),
(4, 'Naruto', 'Studio Pierrot', '2002-10-03', 'A young ninja seeks recognition from his peers and dreams of becoming the Hokage.', 'Action, Adventure', 'https://m.media-amazon.com/images/I/71U6KzJ2w-L._AC_UF894,1000_QL80_.jpg'),
(5, 'Naruto Movie', 'Studio XYZ', '2023-08-01', 'Description of Naruto Movie', 'Action', 'naruto_movie_poster_url'),
(6, 'One Piece 1', 'Toei Animation', '1999-10-20', 'Follows the adventures of Monkey D. Luffy and his pirate crew in the Grand Line.', 'Action, Adventure', 'https://w0.peakpx.com/wallpaper/225/554/HD-wallpaper-anime-one-piece-monkey-d-luffy-gear-5-one-piece.jpg'),
(7, 'Attack on Titan 1', 'Wit Studio', '2013-04-06', 'In a world where humanity resides within enormous walled cities, protecting themselves from Titans.', 'Action, Drama', 'https://m.media-amazon.com/images/I/81dH7-pkjiL.jpg'),
(8, 'Naruto 1', 'Studio Pierrot', '2002-10-03', 'A young ninja seeks recognition from his peers and dreams of becoming the Hokage.', 'Action, Adventure', 'https://m.media-amazon.com/images/I/71U6KzJ2w-L._AC_UF894,1000_QL80_.jpg'),
(9, 'Naruto Movie 1', 'Studio XYZ', '2023-08-01', 'Description of Naruto Movie', 'Action', 'naruto_movie_poster_url'),
(10, 'One Piece 2', 'Toei Animation', '1999-10-20', 'Follows the adventures of Monkey D. Luffy and his pirate crew in the Grand Line.', 'Action, Adventure', 'https://w0.peakpx.com/wallpaper/225/554/HD-wallpaper-anime-one-piece-monkey-d-luffy-gear-5-one-piece.jpg'),
(11, 'Attack on Titan 2', 'Wit Studio', '2013-04-06', 'In a world where humanity resides within enormous walled cities, protecting themselves from Titans.', 'Action, Drama', 'https://m.media-amazon.com/images/I/81dH7-pkjiL.jpg'),
(12, 'Naruto 3', 'Studio Pierrot', '2002-10-03', 'A young ninja seeks recognition from his peers and dreams of becoming the Hokage.', 'Action, Adventure', 'https://m.media-amazon.com/images/I/71U6KzJ2w-L._AC_UF894,1000_QL80_.jpg'),
(13, 'Naruto Movie 3', 'Studio XYZ', '2023-08-01', 'Description of Naruto Movie', 'Action', 'naruto_movie_poster_url'),
(14, 'One Piece 4 ', 'Toei Animation', '1999-10-20', 'Follows the adventures of Monkey D. Luffy and his pirate crew in the Grand Line.', 'Action, Adventure', 'https://w0.peakpx.com/wallpaper/225/554/HD-wallpaper-anime-one-piece-monkey-d-luffy-gear-5-one-piece.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `anime_contest`
--

CREATE TABLE `anime_contest` (
  `id` int(11) NOT NULL,
  `animeid` int(11) DEFAULT NULL,
  `animename` varchar(255) DEFAULT NULL,
  `userwhohasvoted` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `anime_contest`
--

INSERT INTO `anime_contest` (`id`, `animeid`, `animename`, `userwhohasvoted`) VALUES
(1, 1, 'Haikyuu', 1),
(2, 1, 'Haikyuu', 4),
(3, 3, 'Attack on Titan', 4),
(4, 6, 'One Piece 1', 1),
(5, 10, 'One Piece 2', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cosplay_competition`
--

CREATE TABLE `cosplay_competition` (
  `contestid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `photos` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cosplay_competition`
--

INSERT INTO `cosplay_competition` (`contestid`, `name`, `photos`) VALUES
(1, 'mina', 'https://imgtr.ee/images/2023/08/24/e47aa6d63325000877089ecc7c172822.jpeg'),
(4, 'asif', 'https://imgtr.ee/images/2023/08/25/9998a6ad98681a45b367c49ca355fd15.jpeg'),
(5, 'pheobe', 'https://imgtr.ee/images/2023/08/25/0fb1f6b595f8e3f492fd05f778eb23f7.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `ticket_price` decimal(10,2) DEFAULT NULL,
  `Attraction` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `year`, `location`, `date`, `ticket_price`, `Attraction`, `image_url`) VALUES
(1, 'AnimeCon Expo', 2023, 'Tokyo, Japan', '2023-08-25', 25.00, 'Cosplay, Music , Anime Voice Actors', 'https://img.mipon.org/wp-content/uploads/2019/07/27071551/wcs-tokyo14.02.41.jpg'),
(2, 'Otaku Fest', 2023, 'Los Angeles, USA', '2023-09-10', 20.00, 'Otaku Contest, Quiz, Cosplay and Gifts', 'https://www.anime-expo.org/wp-content/uploads/2020/12/Anime-Expo-Logo-Blog-Thumb.jpg'),
(3, 'MangaMania', 2023, 'London, UK', '2023-10-05', 15.00, 'New Manga Launches, Producers and Writers and Meet and Greet', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4T9SRW7bu0Cze_yC-rd88pk8CUXBhRwT5Qg&usqp=CAU'),
(4, 'Japanimation Jamboree', 2023, 'New York, USA', '2023-11-15', 18.50, 'Japan based Anime Writers and Producers,Otaku Summit, Cosplayers and Concerts', 'https://m.media-amazon.com/images/M/MV5BODUxMTNmZTAtNjQ4OC00NmM2LWJkMjgtOWE3MTIzM2RjMjgwXkEyXkFqcGdeQXVyMTE0MzQwMjgz._V1_QL75_UY281_CR18,0,500,281_.jpg'),
(5, 'Cosplay Carnival', 2023, 'Sydney, Australia', '2023-12-02', 22.00, 'Cosplayers meet and greet', 'https://www.animephproject.com/wp-content/uploads/2023/01/Cosplay-Carnival-2023.jpg'),
(7, 'AmazeCon', 2023, 'Banani', '2023-08-17', 500.00, 'Amaze to be Conned', 'https://pbs.twimg.com/media/ECcMkMMXsAAOCy_.jpg'),
(10, 'Initial D', 2024, 'Japan', '2023-08-31', 123.00, 'Initial D Collectors and Car shows', 'https://static.displate.com/280x392/displate/2020-06-12/3e86a46fd6bfba00d654055dd95915e0_de289f48f252fe1138ebb0cb16678ea7.jpg'),
(11, 'HelloKity', 2023, 'Dhaka', '2023-08-17', 500.00, 'hellokity Party', 'https://hellokitty45.com/cdn/shop/files/social-image.png?v=905385811671423901'),
(12, 'Kong Kong', 2023, 'Dhaka', '2023-08-16', 100.00, 'Kong vs Godzilla ', 'https://cdn.vox-cdn.com/thumbor/zD4ZTTBKutLuKAYr6CV1L3cjS0c=/0x0:2864x1200/1200x800/filters:focal(799x609:1257x1067)/cdn.vox-cdn.com/uploads/chorus_image/image/53591117/kongyell.0.jpg'),
(13, 'BRAC University', 2024, 'Dhaka', '2023-08-29', 90.00, 'New Campus', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Brac_University_Logo.png/432px-Brac_University_Logo.png'),
(14, 'Cowboy Bebop', 1993, 'USA', '2023-08-22', 100.00, 'COwboys ungabuga', 'https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/d8/images/canvas/2021/11/12/1386da4d-1371-405e-ab32-5077d43f76ba_a6043c1c.jpg?itok=a0A064Ea&v=1636702371');

-- --------------------------------------------------------

--
-- Table structure for table `interested_events`
--

CREATE TABLE `interested_events` (
  `id` int(11) NOT NULL,
  `eventName` varchar(255) NOT NULL,
  `eventYear` int(22) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `interested_events`
--

INSERT INTO `interested_events` (`id`, `eventName`, `eventYear`, `user_id`) VALUES
(10, 'AnimeCon Expo', 2023, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `list`
--

CREATE TABLE `list` (
  `id` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list`
--

INSERT INTO `list` (`id`, `userid`, `type`) VALUES
(21301705, 1, 'watchlist'),
(21301706, 1, 'wishlist');

-- --------------------------------------------------------

--
-- Table structure for table `manga`
--

CREATE TABLE `manga` (
  `id` int(11) NOT NULL,
  `anime_name` varchar(255) DEFAULT NULL,
  `chapters` int(11) DEFAULT NULL,
  `manga_link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manga`
--

INSERT INTO `manga` (`id`, `anime_name`, `chapters`, `manga_link`) VALUES
(1, 'Naruto', 700, 'https://drive.google.com/file/d/1Uk2fDpEJjlxv7xG_V0E41CSu7xEjA9lu/view?usp=sharing'),
(2, 'One Piece', 1033, 'http://drive.example.com/one-piece'),
(3, 'Attack on Titan', 139, 'https://ww6.manganelo.tv/chapter/manga-oa952283/chapter-139'),
(5, 'Bleach', 687, 'https://bleach-read.com/');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movie_id` int(11) NOT NULL,
  `anime_name` varchar(255) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `poster_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movie_id`, `anime_name`, `duration`, `poster_url`) VALUES
(1, 'Naruto', 110, NULL),
(2, 'One Piece', 130, NULL),
(3, 'Attack on Titan', 115, NULL),
(6, 'Naruto Movie', 120, 'naruto_movie_poster_url');

-- --------------------------------------------------------

--
-- Table structure for table `series`
--

CREATE TABLE `series` (
  `series_id` int(11) NOT NULL,
  `anime_name` varchar(255) DEFAULT NULL,
  `episodes` int(11) DEFAULT NULL,
  `seasons` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `series`
--

INSERT INTO `series` (`series_id`, `anime_name`, `episodes`, `seasons`) VALUES
(1, 'Naruto', 220, 5),
(2, 'One Piece', 1000, 21),
(3, 'Attack on Titan', 75, 4);

-- --------------------------------------------------------

--
-- Table structure for table `thevotes`
--

CREATE TABLE `thevotes` (
  `id` int(11) NOT NULL,
  `who` int(11) NOT NULL,
  `whom` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thevotes`
--

INSERT INTO `thevotes` (`id`, `who`, `whom`) VALUES
(5, 4, 1),
(6, 6, 4),
(7, 6, 5),
(8, 7, 4),
(9, 1, 5),
(10, 1, 4),
(11, 7, 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `joining_date` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `joining_date`, `email`, `dob`, `role`) VALUES
(1, 'mina', 'qwerty', '2023-08-15', 'mina@gmail.com', '2018-06-15', 'client'),
(3, 'anika', 'zxcv', '2023-08-17', 'anika@gmail.com', '2003-02-13', 'client'),
(4, 'asif', 'werty', '2023-08-17', 'asif@gmail.com', '2005-10-13', 'client'),
(5, 'pheobe', 'asdf', '2023-08-18', 'pheobe@gmail.com', '1995-03-23', 'client'),
(6, 'wes', 'asd', '2023-08-20', 'wes@gmail.com', '1989-07-14', 'client'),
(7, 'meowie', 'adminpassword', '2023-08-24', 'meowie@gmail.com', '1990-01-01', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_anime`
--
ALTER TABLE `add_anime`
  ADD PRIMARY KEY (`listid`,`animename`),
  ADD KEY `animename` (`animename`);

--
-- Indexes for table `anime`
--
ALTER TABLE `anime`
  ADD PRIMARY KEY (`animeid`);

--
-- Indexes for table `anime_contest`
--
ALTER TABLE `anime_contest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `animeid` (`animeid`);

--
-- Indexes for table `cosplay_competition`
--
ALTER TABLE `cosplay_competition`
  ADD PRIMARY KEY (`contestid`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD KEY `idx_name_year` (`name`,`year`);

--
-- Indexes for table `interested_events`
--
ALTER TABLE `interested_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eventName` (`eventName`,`eventYear`);

--
-- Indexes for table `list`
--
ALTER TABLE `list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `manga`
--
ALTER TABLE `manga`
  ADD PRIMARY KEY (`id`),
  ADD KEY `anime_name` (`anime_name`);

--
-- Indexes for table `thevotes`
--
ALTER TABLE `thevotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_voter` (`who`),
  ADD KEY `fk_contestant` (`whom`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anime`
--
ALTER TABLE `anime`
  MODIFY `animeid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `anime_contest`
--
ALTER TABLE `anime_contest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `interested_events`
--
ALTER TABLE `interested_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `list`
--
ALTER TABLE `list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21301707;

--
-- AUTO_INCREMENT for table `manga`
--
ALTER TABLE `manga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `thevotes`
--
ALTER TABLE `thevotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `anime_contest`
--
ALTER TABLE `anime_contest`
  ADD CONSTRAINT `anime_contest_ibfk_1` FOREIGN KEY (`animeid`) REFERENCES `anime` (`animeid`);

--
-- Constraints for table `interested_events`
--
ALTER TABLE `interested_events`
  ADD CONSTRAINT `interested_events_ibfk_1` FOREIGN KEY (`eventName`,`eventYear`) REFERENCES `events` (`name`, `year`);

--
-- Constraints for table `list`
--
ALTER TABLE `list`
  ADD CONSTRAINT `list_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);

--
-- Constraints for table `thevotes`
--
ALTER TABLE `thevotes`
  ADD CONSTRAINT `fk_contestant` FOREIGN KEY (`whom`) REFERENCES `cosplay_competition` (`contestid`),
  ADD CONSTRAINT `fk_voter` FOREIGN KEY (`who`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
