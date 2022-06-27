-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2022 at 02:04 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tubesmibdpbw`
--

-- --------------------------------------------------------

--
-- Table structure for table `cekpemesanrt`
--

CREATE TABLE `cekpemesanrt` (
  `id_rt` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_pemesanan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cekpemesanrw`
--

CREATE TABLE `cekpemesanrw` (
  `id_rw` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_pemesanan` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `kecamatan`
--

CREATE TABLE `kecamatan` (
  `id_kec` int(5) NOT NULL,
  `nama_kec` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kecamatan`
--

INSERT INTO `kecamatan` (`id_kec`, `nama_kec`) VALUES
(1, 'Bandung barat'),
(13, 'cimaung');

-- --------------------------------------------------------

--
-- Table structure for table `kelurahan`
--

CREATE TABLE `kelurahan` (
  `id_kel` int(5) NOT NULL,
  `nama_kel` varchar(15) NOT NULL,
  `id_kec` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kelurahan`
--

INSERT INTO `kelurahan` (`id_kel`, `nama_kel`, `id_kec`) VALUES
(7, 'cisarua', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `kelurahan_data`
-- (See below for the actual view)
--
CREATE TABLE `kelurahan_data` (
`nama_kel` varchar(15)
,`nama_kec` varchar(15)
);

-- --------------------------------------------------------

--
-- Table structure for table `kemasanmigor`
--

CREATE TABLE `kemasanmigor` (
  `id_migor` int(11) NOT NULL,
  `nama_minyak` varchar(8) NOT NULL,
  `harga` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kemasanmigor`
--

INSERT INTO `kemasanmigor` (`id_migor`, `nama_minyak`, `harga`) VALUES
(1, 'sunco', '17000'),
(4, 'bimoli', '15000'),
(5, 'fortune', '14000');

-- --------------------------------------------------------

--
-- Table structure for table `kemasanmigorwarga`
--

CREATE TABLE `kemasanmigorwarga` (
  `id_migor` int(11) NOT NULL,
  `id_warga` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `memeriksa`
--

CREATE TABLE `memeriksa` (
  `id_staf` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pemesanan`
--

CREATE TABLE `pemesanan` (
  `id_pemesanan` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` varchar(8) NOT NULL,
  `id_warga` int(11) NOT NULL,
  `id_User` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `periksatransaksi`
--

CREATE TABLE `periksatransaksi` (
  `id_transaksi` int(11) NOT NULL,
  `id_staf` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `periodepemesanan`
--

CREATE TABLE `periodepemesanan` (
  `id_perioda` int(11) NOT NULL,
  `nama_perioda` varchar(15) NOT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_berakhir` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `periodepemesanan`
--

INSERT INTO `periodepemesanan` (`id_perioda`, `nama_perioda`, `tanggal_mulai`, `tanggal_berakhir`) VALUES
(1, 'Periode 1', '2022-06-10', '2022-06-24'),
(3, 'Periode 2', '2022-07-12', '2022-07-20');

-- --------------------------------------------------------

--
-- Table structure for table `periodepemesananwarga`
--

CREATE TABLE `periodepemesananwarga` (
  `id_periode` int(11) NOT NULL,
  `id_warga` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rt`
--

CREATE TABLE `rt` (
  `id_rt` int(5) NOT NULL,
  `no_rt` varchar(5) NOT NULL,
  `nama_kepala_rt` varchar(50) NOT NULL,
  `id_rw` int(5) NOT NULL,
  `id_u` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rt`
--

INSERT INTO `rt` (`id_rt`, `no_rt`, `nama_kepala_rt`, `id_rw`, `id_u`) VALUES
(4, '001', 'jupri', 23, 61),
(5, '001', 'juya', 22, 62);

-- --------------------------------------------------------

--
-- Table structure for table `rw`
--

CREATE TABLE `rw` (
  `id_rw` int(5) NOT NULL,
  `no_rw` varchar(5) NOT NULL,
  `nama_ketua_rw` varchar(50) NOT NULL,
  `id_kel` int(5) NOT NULL,
  `id_u` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rw`
--

INSERT INTO `rw` (`id_rw`, `no_rw`, `nama_ketua_rw`, `id_kel`, `id_u`) VALUES
(22, '001', 'Irsyad', 7, 24),
(23, '002', 'wildan', 7, 42);

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `tgl_transaksi` date NOT NULL,
  `id_rw` varchar(8) NOT NULL,
  `id_user` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_U` int(5) NOT NULL,
  `username` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `alamat` varchar(50) DEFAULT NULL,
  `role_u` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_U`, `username`, `pass`, `nama`, `alamat`, `role_u`) VALUES
(1, 'admin123', 'JAvlGPq9JyTdtvBO6x2llnRI1+gxwIyPqCKAn3THIKk=', NULL, NULL, 'admin'),
(2, 'staf123', '1V7Tf69TXpsk17qgQXNzW5Vl00IdT7ZysY8nMOJ/xcg=', 'wilson', NULL, 'staf'),
(24, 'Irsyad123', 'pdbjGxiEAyeYofAlfPNXAuHZVVeabD5JTupny4UsKFA=', 'Irsyad', NULL, 'rw'),
(38, 'mamat123', 'Jp8fFE0sf+Jcy2XLf/L7+nw6kVN9oMp5/Gy5UWuOU2s=', 'mamat', NULL, 'kepaladinas'),
(39, 'sergio123', '53y5lEGPW8DsEAe2wTeRjZrtTnsL3kXXSlDQknLC1gI=', 'sergio', NULL, 'warga'),
(42, 'wildan123', 'gtIOynYRojxzKxyzMArqvWvzKSsndQVmzaXSbz9uDIY=', 'wildan', NULL, 'rw'),
(61, 'jupri123', 'FzO7Gwofrbhr1gambpZQuf2YnlDBUIHenyDuBlbPs9g=', 'jupri', NULL, 'rt'),
(62, 'juya123', 'mg9gyiclbdySBYQnGJ+s0J9lSZB1w8zwVAQuIV+uQEg=', 'juya', NULL, 'rt'),
(68, 'reyga123', '5pnkqMSHwiAhI+8IiM8mbhk0u7X/AKdYrcLcItAHZ0w=', 'reyga', NULL, 'warga');

-- --------------------------------------------------------

--
-- Stand-in structure for view `viewrt`
-- (See below for the actual view)
--
CREATE TABLE `viewrt` (
`no_rt` varchar(5)
,`nama_kepala_rt` varchar(50)
,`alamat` varchar(50)
,`id_rw` int(5)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `viewrw`
-- (See below for the actual view)
--
CREATE TABLE `viewrw` (
`id_U` int(5)
,`no_rw` varchar(5)
,`nama_ketua_rw` varchar(50)
,`alamat` varchar(50)
,`nama_kel` varchar(15)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `viewwarga`
-- (See below for the actual view)
--
CREATE TABLE `viewwarga` (
`id_warga` int(5)
,`nama_warga` varchar(50)
,`alamat` varchar(50)
,`id_rt` int(5)
);

-- --------------------------------------------------------

--
-- Table structure for table `warga`
--

CREATE TABLE `warga` (
  `id_warga` int(5) NOT NULL,
  `nama_warga` varchar(50) NOT NULL,
  `id_rt` int(5) NOT NULL,
  `id_u` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `warga`
--

INSERT INTO `warga` (`id_warga`, `nama_warga`, `id_rt`, `id_u`) VALUES
(3, 'reyga', 5, 68);

-- --------------------------------------------------------

--
-- Structure for view `kelurahan_data`
--
DROP TABLE IF EXISTS `kelurahan_data`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `kelurahan_data`  AS SELECT `kelurahan`.`nama_kel` AS `nama_kel`, `kecamatan`.`nama_kec` AS `nama_kec` FROM (`kelurahan` join `kecamatan` on(`kelurahan`.`id_kec` = `kecamatan`.`id_kec`))  ;

-- --------------------------------------------------------

--
-- Structure for view `viewrt`
--
DROP TABLE IF EXISTS `viewrt`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `viewrt`  AS SELECT `rt`.`no_rt` AS `no_rt`, `rt`.`nama_kepala_rt` AS `nama_kepala_rt`, `users`.`alamat` AS `alamat`, `rt`.`id_rw` AS `id_rw` FROM (`rt` join `users` on(`rt`.`id_u` = `users`.`id_U`))  ;

-- --------------------------------------------------------

--
-- Structure for view `viewrw`
--
DROP TABLE IF EXISTS `viewrw`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `viewrw`  AS SELECT `users`.`id_U` AS `id_U`, `rw`.`no_rw` AS `no_rw`, `rw`.`nama_ketua_rw` AS `nama_ketua_rw`, `users`.`alamat` AS `alamat`, `kelurahan`.`nama_kel` AS `nama_kel` FROM ((`rw` join `users` on(`rw`.`id_u` = `users`.`id_U`)) join `kelurahan` on(`rw`.`id_kel` = `kelurahan`.`id_kel`))  ;

-- --------------------------------------------------------

--
-- Structure for view `viewwarga`
--
DROP TABLE IF EXISTS `viewwarga`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `viewwarga`  AS SELECT `warga`.`id_warga` AS `id_warga`, `warga`.`nama_warga` AS `nama_warga`, `users`.`alamat` AS `alamat`, `warga`.`id_rt` AS `id_rt` FROM (`warga` join `users` on(`warga`.`id_u` = `users`.`id_U`))  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kecamatan`
--
ALTER TABLE `kecamatan`
  ADD PRIMARY KEY (`id_kec`);

--
-- Indexes for table `kelurahan`
--
ALTER TABLE `kelurahan`
  ADD PRIMARY KEY (`id_kel`),
  ADD KEY `FK-kec` (`id_kec`);

--
-- Indexes for table `kemasanmigor`
--
ALTER TABLE `kemasanmigor`
  ADD PRIMARY KEY (`id_migor`);

--
-- Indexes for table `periodepemesanan`
--
ALTER TABLE `periodepemesanan`
  ADD PRIMARY KEY (`id_perioda`);

--
-- Indexes for table `periodepemesananwarga`
--
ALTER TABLE `periodepemesananwarga`
  ADD PRIMARY KEY (`id_periode`);

--
-- Indexes for table `rt`
--
ALTER TABLE `rt`
  ADD PRIMARY KEY (`id_rt`),
  ADD KEY `FK-rw` (`id_rw`),
  ADD KEY `FK-userrt` (`id_u`);

--
-- Indexes for table `rw`
--
ALTER TABLE `rw`
  ADD PRIMARY KEY (`id_rw`) USING BTREE,
  ADD KEY `id_kel` (`id_kel`),
  ADD KEY `FK-userrw` (`id_u`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_U`);

--
-- Indexes for table `warga`
--
ALTER TABLE `warga`
  ADD PRIMARY KEY (`id_warga`),
  ADD KEY `FK-userwarga` (`id_u`),
  ADD KEY `FK-wargart` (`id_rt`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kecamatan`
--
ALTER TABLE `kecamatan`
  MODIFY `id_kec` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `kelurahan`
--
ALTER TABLE `kelurahan`
  MODIFY `id_kel` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `kemasanmigor`
--
ALTER TABLE `kemasanmigor`
  MODIFY `id_migor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `periodepemesanan`
--
ALTER TABLE `periodepemesanan`
  MODIFY `id_perioda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `periodepemesananwarga`
--
ALTER TABLE `periodepemesananwarga`
  MODIFY `id_periode` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rt`
--
ALTER TABLE `rt`
  MODIFY `id_rt` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rw`
--
ALTER TABLE `rw`
  MODIFY `id_rw` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_U` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `warga`
--
ALTER TABLE `warga`
  MODIFY `id_warga` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kelurahan`
--
ALTER TABLE `kelurahan`
  ADD CONSTRAINT `FK-kec` FOREIGN KEY (`id_kec`) REFERENCES `kecamatan` (`id_kec`);

--
-- Constraints for table `rt`
--
ALTER TABLE `rt`
  ADD CONSTRAINT `FK-rw` FOREIGN KEY (`id_rw`) REFERENCES `rw` (`id_rw`),
  ADD CONSTRAINT `FK-userrt` FOREIGN KEY (`id_u`) REFERENCES `users` (`id_U`);

--
-- Constraints for table `rw`
--
ALTER TABLE `rw`
  ADD CONSTRAINT `FK-Kel` FOREIGN KEY (`id_kel`) REFERENCES `kelurahan` (`id_kel`),
  ADD CONSTRAINT `FK-userrw` FOREIGN KEY (`id_u`) REFERENCES `users` (`id_U`);

--
-- Constraints for table `warga`
--
ALTER TABLE `warga`
  ADD CONSTRAINT `FK-userwarga` FOREIGN KEY (`id_u`) REFERENCES `users` (`id_U`),
  ADD CONSTRAINT `FK-wargart` FOREIGN KEY (`id_rt`) REFERENCES `rt` (`id_rt`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
