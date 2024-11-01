package com.app.positionback.service.inquiry;

import com.app.positionback.domain.file.FileDTO;
import com.app.positionback.domain.file.FileVO;
import com.app.positionback.domain.inquiry.InquiryDTO;
import com.app.positionback.domain.inquiry.InquiryVO;
import com.app.positionback.repository.inquiry.InquiryDAO;
import com.app.positionback.repository.inquiry.InquiryFileDAO;
import com.app.positionback.repository.notice.NoticeFileDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@Primary
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class InquiryServiceImpl implements InquiryService {
    private final InquiryDAO inquiryDAO;
    private final InquiryFileDAO inquiryFileDAO;

    @Override
    public void saveInquiry(InquiryDTO inquiryDTO, MultipartFile file) throws IOException {
        inquiryDAO.saveInquiry(inquiryDTO);
        Long inquiryId = inquiryDAO.selectRecentInsertedId();
        saveAndLinkInquiryFile(file, inquiryId);
    }

    private void saveAndLinkInquiryFile(MultipartFile file, Long inquiryId) throws IOException {
        if (file != null && !file.isEmpty()) {
            String rootPath = "C:/upload/" + getPath();
            UUID uuid = UUID.randomUUID();

            File directory = new File(rootPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            File savedFile = new File(rootPath + uuid.toString() + "_" + file.getOriginalFilename());
            file.transferTo(savedFile);

            FileDTO fileDTO = new FileDTO();
            fileDTO.setFilePath(getPath());
            fileDTO.setFileName(uuid.toString() + "_" + file.getOriginalFilename());

            // saveInquiryFile => 문의 파일 저장
            inquiryFileDAO.saveInquiryFile(fileDTO);
            Long fileId = inquiryFileDAO.selectRecentInsertedId();
            //  linkInquiryWithFile => 문의와 파일 연결
            inquiryFileDAO.linkInquiryWithFile(inquiryId, fileId);
        }
    }

    private String getPath(){
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }
}
