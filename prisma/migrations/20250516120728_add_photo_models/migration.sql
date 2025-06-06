/*
  Warnings:

  - You are about to drop the column `description` on the `photocategory` table. All the data in the column will be lost.
  - Made the column `alt` on table `photo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `PhotoCategory_name_key` ON `photocategory`;

-- AlterTable
ALTER TABLE `photo` MODIFY `alt` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `photocategory` DROP COLUMN `description`;
