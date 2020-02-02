-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2019 at 10:21 PM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node1`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(30) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(30) NOT NULL,
  `userID` int(30) NOT NULL,
  `hotelid` int(30) NOT NULL,
  `hName` varchar(100) NOT NULL,
  `hAddress` varchar(100) NOT NULL,
  `roomType` varchar(30) NOT NULL,
  `checkin` varchar(30) NOT NULL,
  `checkout` varchar(30) NOT NULL,
  `paid` int(30) NOT NULL,
  `due` int(30) NOT NULL,
  `status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `userID`, `hotelid`, `hName`, `hAddress`, `roomType`, `checkin`, `checkout`, `paid`, `due`, `status`) VALUES
(65, 2, 2, 'New Olive Hotel', '13/A Kemal Ataturk', 'suite', '7/2/2019', '7/17/2019', 0, 0, 'Booked'),
(66, 2, 2, 'New Olive Hotel', '13/A Kemal Ataturk', 'suite', '7/16/2019', '7/30/2019', 0, 0, 'Booked');

-- --------------------------------------------------------

--
-- Table structure for table `hotel`
--

CREATE TABLE `hotel` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `location` varchar(100) NOT NULL,
  `totalroom` varchar(25) NOT NULL,
  `price` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hotel`
--

INSERT INTO `hotel` (`id`, `name`, `location`, `totalroom`, `price`) VALUES
(1, 'aa', 'dhaka', '120', '2000');

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(30) NOT NULL,
  `hotelName` varchar(100) NOT NULL,
  `hotelAddress` varchar(100) NOT NULL,
  `suite` int(30) NOT NULL,
  `family` int(30) NOT NULL,
  `deluxe` int(30) NOT NULL,
  `classic` int(30) NOT NULL,
  `superior` int(30) NOT NULL,
  `luxury` int(30) NOT NULL,
  `status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `hotelName`, `hotelAddress`, `suite`, `family`, `deluxe`, `classic`, `superior`, `luxury`, `status`) VALUES
(1, 'New Orleans Hotel', '38/A AKA Street', 10, 10, 10, 20, 20, 20, 'active'),
(2, 'New Olive Hotel', '13/A Kemal Ataturk', 18, 20, 20, 10, 10, 10, 'active'),
(16, 'Eurasia', 'aka 35?A', 10, 10, 10, 10, 10, 10, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `hr`
--

CREATE TABLE `hr` (
  `id` int(10) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `gender` varchar(30) NOT NULL,
  `dateofbirth` varchar(60) NOT NULL,
  `salary` int(11) NOT NULL,
  `password` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hr`
--

INSERT INTO `hr` (`id`, `username`, `email`, `contact`, `address`, `gender`, `dateofbirth`, `salary`, `password`, `status`) VALUES
(18, 'Rohit', 'rafsan@gmail.com', '01557867911', 'Jigatola bustand', 'Male', '1996-02-08', 31000, '12345678', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(30) NOT NULL,
  `pName` varchar(100) NOT NULL,
  `pQuantity` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `pName`, `pQuantity`) VALUES
(4, 'Mobile', '2'),
(6, 'LED TV', '9');

-- --------------------------------------------------------

--
-- Table structure for table `receptionist`
--

CREATE TABLE `receptionist` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `dob` varchar(30) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `salary` int(30) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(50) NOT NULL,
  `hotelname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `receptionist`
--

INSERT INTO `receptionist` (`id`, `name`, `email`, `password`, `dob`, `gender`, `salary`, `phone`, `address`, `hotelname`) VALUES
(1, 'rich', 'asd@gamil.com', 'asd', '2019-07-11', 'Female', 345, '345', '	fbcv', 'Dhaka'),
(2, 'rich', 'asd@gamil.com', 'ds', '2019-07-10', 'Female', 345, '345', '	fgh', 'Chittagong'),
(3, 'bjk', 'sho121@gmail.com', 'j', '2019-07-05', 'Male', 35, '56', 'dfs', 'dfvx'),
(4, 'rich', 'rich@gmail.com', 'sdf', '2019-07-11', 'Male', 345, '345', '	jkl', 'hjk'),
(5, 'fdg', 'sho121@gmail.com', 'dfg', '2019-07-12', 'Male', 456, '456', 'fgdfg', 'zfsdf');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `type` varchar(30) NOT NULL DEFAULT 'client'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `address`, `email`, `phone`, `password`, `type`) VALUES
(1, 'John Doe', '33/A AKA Street, New Jersey', 'john@gmail.com', '+8801345454545', '10000', 'client'),
(2, 'Toufiqul Islam', '13/A Uttara, Dhaka', 'richtoufiq98@gmail.com', '+8801345454547', '999999', 'client'),
(11, 'Henry gillbart', '34/A rt Street new york', 'henry@gmail.com', '+8801333333333', '123432', 'hr'),
(12, 'Josh Albert', '45/KA New Hampshere', 'josh@gmail.com', '+8803456789012', '234432', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hr`
--
ALTER TABLE `hr`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `receptionist`
--
ALTER TABLE `receptionist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT for table `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `hr`
--
ALTER TABLE `hr`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `receptionist`
--
ALTER TABLE `receptionist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
