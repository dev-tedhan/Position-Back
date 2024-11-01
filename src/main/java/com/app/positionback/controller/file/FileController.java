package com.app.positionback.controller.file;

import com.app.positionback.domain.file.FileDTO;
import com.app.positionback.service.file.CorporationFileService;
import com.app.positionback.service.file.FileService;
import com.app.positionback.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/file/*")
public class FileController {
    private final MemberService memberService;

    @PostMapping("upload")
    @ResponseBody
    public FileDTO uploadCompanyFile(MultipartFile file) throws IOException {
        return memberService.uploadFile(file);
    }

    @GetMapping("display")
    @ResponseBody
    public byte[] display(String fileName) throws IOException {
        return FileCopyUtils.copyToByteArray(new File("C:/upload", fileName));
    }
}
