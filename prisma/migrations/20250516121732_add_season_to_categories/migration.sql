-- AlterTable
ALTER TABLE `photocategory` 
  ADD COLUMN `season` VARCHAR(191) NOT NULL DEFAULT 'Vara';

-- Update existing season values
UPDATE `photocategory` SET `season` = 'Vara' WHERE `season` = 'summer';
UPDATE `photocategory` SET `season` = 'Iarna' WHERE `season` = 'winter';

-- Add unique constraint
ALTER TABLE `photocategory` 
  ADD UNIQUE INDEX `PhotoCategory_name_season_key` (`name`, `season`);
