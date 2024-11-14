-- RenameIndex
ALTER TABLE `prescricao` RENAME INDEX `Prescricao_id_remedio_fkey` TO `Prescricao_id_remedio_idx`;

-- RenameIndex
ALTER TABLE `prescricao` RENAME INDEX `Prescricao_id_usuario_fkey` TO `Prescricao_id_usuario_idx`;
