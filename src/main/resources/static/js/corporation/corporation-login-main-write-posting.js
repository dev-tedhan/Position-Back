const ulElement = document.querySelector(".list.overview");

// 스크롤 위치에 따라 상단 고정 (선택적 구현)
ulElement.addEventListener("scroll", () => {
    const scrollTop = ulElement.scrollTop; // ul 내부의 스크롤 위치
    console.log(`스크롤 위치: ${scrollTop}px`);
});


// 직무 추가 삭제
// 모든 btn-three-depth 버튼에 이벤트 리스너 추가
const boxDetailDepth = document.querySelector(".box-detail-depth");
boxDetailDepth.addEventListener('click', (event) => {
    const button = event.target.closest('.btn-three-depth');
    if (button) {
        // 버튼에 on 클래스 토글
        button.classList.toggle('on');

        // 해당 버튼의 텍스트 값을 가져오기
        const jobName = button.innerText; // 버튼의 텍스트 값
        const txtValueElement = button.closest('.box-detail-jobs').querySelector('.item-job.depth1-btn-wrapper.on .txt'); // .txt 클래스의 span 값

        // .txt 요소가 존재하는지 확인하고, 값 가져오기
        const txtValue = txtValueElement ? txtValueElement.innerText : '';

        // 결과를 추가하거나 제거
        const ddElement = document.querySelector('.box-result .list dd'); // 선택한 직무 dd 찾기

        if (button.classList.contains('on')) {
            // on 클래스가 추가되었을 때
            const selectedJobSpan = document.createElement('span'); // 새로운 span 생성
            selectedJobSpan.className = 'job-selected'; // 클래스 추가 (필요시)
            selectedJobSpan.innerHTML = `${txtValue}<button type="button" class="btnDelete deleteToDepth"><span class="blind">삭제</span></button> &nbsp;&gt;&nbsp;&nbsp;${jobName}<button type="button" class="btn-delete deleteToKeyword"><span class="blind">삭제</span></button>`;

            // 선택한 직무 리스트에 추가
            ddElement.appendChild(selectedJobSpan);

            // btn-delete 버튼 클릭 이벤트 추가
            const deleteButton = selectedJobSpan.querySelector('.btn-delete');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // 이벤트 전파 방지
                // btn-three-depth 버튼에서 같은 jobName 찾기
                const relatedButton = Array.from(document.querySelectorAll('.btn-three-depth')).find(btn => btn.innerText === jobName);

                if (relatedButton) {
                    relatedButton.classList.remove('on'); // on 클래스 제거
                }

                // job-selected span 제거
                ddElement.removeChild(selectedJobSpan);

                // 선택된 직무가 없으면 메시지 표시
                updateNoSelectionMessage(ddElement);
            });
        } else {
            // on 클래스가 삭제되었을 때, 관련된 span 제거
            const spans = ddElement.querySelectorAll('span.job-selected'); // dd 안의 모든 선택된 span 찾기

            spans.forEach(span => {
                // 버튼 텍스트와 span의 내용을 비교하여 일치하는 경우 제거
                if (span.innerText.includes(jobName)) {
                    ddElement.removeChild(span); // 해당 span 제거
                }
            });
        }

        // 선택된 직무가 없으면 메시지 표시
        updateNoSelectionMessage(ddElement);
    }
});

// 선택된 직무가 없으면 메시지 표시하는 함수
const updateNoSelectionMessage = (ddElement) => {
    const noSelectionSpan = ddElement.querySelector('span.no-selection');
    if (ddElement.childElementCount === 0) {
        if (!noSelectionSpan) {
            const span = document.createElement('span');
            span.className = 'no-selection'; // 클래스 추가
            span.innerText = '선택된 직무가 없습니다'; // 메시지
            ddElement.appendChild(span);
        }
    } else {
        if (noSelectionSpan) {
            ddElement.removeChild(noSelectionSpan); // 메시지 제거
        }
    }
};

// document.querySelectorAll('.btn-three-depth').forEach(button => {
//     button.addEventListener('click', () => {
//         // 버튼에 on 클래스 토글
//         button.classList.toggle('on');
//
//         // 해당 버튼의 텍스트 값을 가져오기
//         const jobName = button.innerText; // 버튼의 텍스트 값
//         const txtValueElement = button.closest('.box-detail-jobs').querySelector('.item-job.depth1-btn-wrapper.on .txt'); // .txt 클래스의 span 값
//
//         // .txt 요소가 존재하는지 확인하고, 값 가져오기
//         const txtValue = txtValueElement ? txtValueElement.innerText : '';
//
//         // 결과를 추가하거나 제거
//         const ddElement = document.querySelector('.box-result .list dd'); // 선택한 직무 dd 찾기
//
//         if (button.classList.contains('on')) {
//             // on 클래스가 추가되었을 때
//             const selectedJobSpan = document.createElement('span'); // 새로운 span 생성
//             selectedJobSpan.className = 'job-selected'; // 클래스 추가 (필요시)
//             selectedJobSpan.innerHTML = `${txtValue}<button type="button" class="btnDelete deleteToDepth"><span class="blind">삭제</span></button> &nbsp;&gt;&nbsp;&nbsp;${jobName}<button type="button" class="btn-delete deleteToKeyword"><span class="blind">삭제</span></button>`;
//
//             // 선택한 직무 리스트에 추가
//             ddElement.appendChild(selectedJobSpan);
//
//             // btn-delete 버튼 클릭 이벤트 추가
//             const deleteButton = selectedJobSpan.querySelector('.btn-delete');
//             deleteButton.addEventListener('click', () => {
//                 // btn-three-depth 버튼에서 같은 jobName 찾기
//                 const relatedButton = Array.from(document.querySelectorAll('.btn-three-depth')).find(btn => btn.innerText === jobName);
//
//                 if (relatedButton) {
//                     relatedButton.classList.remove('on'); // on 클래스 제거
//                 }
//
//                 // job-selected span 제거
//                 ddElement.removeChild(selectedJobSpan);
//
//                 // 선택된 직무가 없으면 메시지 표시
//                 const noSelectionSpan = ddElement.querySelector('span.no-selection');
//                 if (ddElement.childElementCount === 0) {
//                     if (!noSelectionSpan) {
//                         const span = document.createElement('span');
//                         span.className = 'no-selection'; // 클래스 추가
//                         span.innerText = '선택된 직무가 없습니다'; // 메시지
//                         ddElement.appendChild(span);
//                     }
//                 } else {
//                     if (noSelectionSpan) {
//                         ddElement.removeChild(noSelectionSpan); // 메시지 제거
//                     }
//                 }
//             });
//         } else {
//             // on 클래스가 삭제되었을 때, 관련된 span 제거
//             const spans = ddElement.querySelectorAll('span.job-selected'); // dd 안의 모든 선택된 span 찾기
//
//             spans.forEach(span => {
//                 // 버튼 텍스트와 span의 내용을 비교하여 일치하는 경우 제거
//                 if (span.innerText.includes(jobName)) {
//                     ddElement.removeChild(span); // 해당 span 제거
//                 }
//             });
//         }
//
//         // 선택된 직무가 없으면 메시지 표시
//         const noSelectionSpan = ddElement.querySelector('span.no-selection');
//         if (ddElement.childElementCount === 0) {
//             if (!noSelectionSpan) {
//                 const span = document.createElement('span');
//                 span.className = 'no-selection'; // 클래스 추가
//                 span.innerText = '선택된 직무가 없습니다'; // 메시지
//                 ddElement.appendChild(span);
//             }
//         } else {
//             if (noSelectionSpan) {
//                 ddElement.removeChild(noSelectionSpan); // 메시지 제거
//             }
//         }
//     });
// });






// 검색할때 검색창
const input = document.getElementById("job-category-ipt-keyword");
const resultWrapper = document.querySelector('.wrap-result.has-result');
const deleteButton = document.querySelector('.btn-delete');
const closeButtons = document.querySelectorAll('.btn-close'); // 모든 btn-close 버튼 선택

// 입력 이벤트 처리
input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
        resultWrapper.style.display = 'block';  // 값이 있으면 보여줌
        deleteButton.style.display ='block';
    } else {
        resultWrapper.style.display = 'none';  // 값이 없으면 숨김
        deleteButton.style.display ='none';
    }
});

// 삭제 버튼 클릭 시 input 값 비우고 결과 숨기기
deleteButton.addEventListener('click', () => {
    input.value = '';  // input 값 비우기
    resultWrapper.style.display = 'none';  // 결과 숨기기
    deleteButton.style.display ='none';
});

// 모든 닫기 버튼에 클릭 이벤트 추가
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        input.value = '';  // input 값 비우기
        resultWrapper.style.display = 'none';  // 결과 숨기기
        deleteButton.style.display ='none';
    });
});


// 창 높이 조절
// MutationObserver 설정
const targetNode = document.querySelector('.box-detail-depth .viewport');
const config = { childList: true, subtree: true };

const callback = (mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // 자식 노드가 변경되면 높이 업데이트
            const parent = targetNode.closest('.box-detail-depth');
            updateParentHeight(parent);
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
// 창 높이 조절
document.querySelector('.box-detail-jobs').addEventListener('click', (event) => {
    console.log('클릭된 요소:', event.target); // 클릭된 요소 로그 출력
    // 클릭한 요소가 .btn-expand 버튼인지 확인
    if (event.target.classList.contains('btn-expand')) {
        const button = event.target;
        const rowItem = button.closest('.row-item');
        rowItem.classList.toggle('expand');

        // 부모 요소의 높이 재조정
        const parent = rowItem.closest('.box-detail-depth');
        updateParentHeight(parent);
    }
    if (event.target.classList.contains('first-depth')||event.target.classList.contains('txt')) {
        // depth1-btn-wrapper 클릭 시 높이만 업데이트
        // const parent = document.querySelector('.box-detail-depth');
        // updateParentHeight(parent);
    }
});

/**
 * 부모 높이를 모든 row-item의 높이에 맞게 업데이트하고,
 * 관련된 .box-onedepth의 높이도 동일하게 맞춤
 */
function updateParentHeight(parent) {
    const rowList = parent.closest('.box-detail-jobs').querySelector('.row.list'); // .row.list 찾기
    const depthViewport = parent.querySelector('.viewport'); // depth 관련 viewport
    let totalHeight = 0;

    // 모든 row-item의 높이를 합산
    depthViewport.querySelectorAll('.row-item').forEach(item => {
        totalHeight += item.scrollHeight; // 각 row-item의 전체 높이 추가
    });

    // 부모 .viewport의 높이 설정
    depthViewport.style.height = totalHeight + 'px';

    // .row.list의 높이 설정
    if (rowList) {
        rowList.style.height = totalHeight + 'px';
    }

    // 관련된 .box-onedepth의 높이도 동일하게 설정
    const boxOnedepth = parent.closest('.box-detail-jobs').querySelector('.box-onedepth');
    if (boxOnedepth) {
        boxOnedepth.style.height = totalHeight + 'px';
    }
}



// 입력된 3개(월, 일, 근무시간) 데이터를 하나로 합쳐서 db에 전달하는 js
document.addEventListener('DOMContentLoaded', () => {
    const monthSelect = document.getElementById('interviewDateMonth');
    const daySelect = document.getElementById('interviewDateDay');
    const companyTimeInput = document.getElementById('companyTime');
    // const noticeWorkDateField = document.getElementById('noticeWorkDateField');

    const fileInput = document.querySelector("input[type=file]"); // 파일 입력
    const uploadName = document.querySelector(".upload-name"); // 파일 이름을 표시할 input
    const submitBtn = document.getElementById("submitBtn"); // 완료 버튼

    // 파일 선택 이벤트
    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0]; // 첫 번째 파일
        if (file) {
            uploadName.value = file.name; // 파일 이름을 표시
        }
    });


    // function updateNoticeEducation() {
    //     const month = monthSelect.value;
    //     const day = daySelect.value;
    //     const workTime = companyTimeInput.value;
    //
    //     if (month && day && workTime) {
    //         noticeWorkDateField.value = `${month} ${day} ${workTime}`;
    //     } else {
    //         noticeWorkDateField.value = '';
    //     }
    // }
    //
    // // Add event listeners to update the hidden field on change
    // monthSelect.addEventListener('change', updateNoticeEducation);
    // daySelect.addEventListener('change', updateNoticeEducation);
    // companyTimeInput.addEventListener('input', updateNoticeEducation);
});


const dueDateValue = document.getElementById("dueDate");
const curr = new Date();
const KRdueDateValue = 9 * 60 * 60 * 1000; // 한국 시간대의 UTC 오프셋

// 현재 시간을 한국 시간으로 변환
const KRcurrentDate = new Date(curr.getTime() + KRdueDateValue);

// dueDateValue에 한국 시간의 ISO 문자열을 설정합니다.
dueDateValue.value = KRcurrentDate.toISOString().slice(0, 16);

// min 속성에도 한국 시간으로 현재 시간을 설정합니다.
dueDateValue.min = KRcurrentDate.toISOString().slice(0, 16); // 현재 시간을 기준으로 설정

console.log(dueDateValue.value);

// 대상 요소 선택
const targetElement = document.querySelector(
    ".option-content.job-category-section"
);
// 버튼 클릭 시 on 클래스 토글
document.getElementById("selected-job").addEventListener("click",  ()=> {
        const boxJobs = document.querySelector(".box-jobs");
        // on 클래스 추가
        targetElement.classList.add("on");
        boxJobs.style.display = "block";
    });

document.querySelector(".btn.btn-job-cancel").addEventListener("click", () =>{
    targetElement.classList.remove("on");
    const boxJobs = document.querySelector(".box-jobs");
    const boxDetailJobs = document.querySelector(".box-detail-jobs");
    boxJobs.style.display = "none";
    boxDetailJobs.style.display = "none";
})
// document.querySelector(".btn.btn-job-confirm").addEventListener("click", () =>{
//     targetElement.classList.remove("on");
// })

const confirmButton = document.querySelector(".btn.btn-job-confirm");
const taskList = document.querySelector(".list-task.list-hope-jobs.size-type5.selected-preview-list"); // <ul> 요소 선택

confirmButton.addEventListener("click", () => {

    // 모든 선택된 직무 span 요소를 가져옴
    const selectedJobSpans = document.querySelectorAll('span.job-selected');
    const boxJobs = document.querySelector(".box-jobs");
    const boxDetailJobs = document.querySelector(".box-detail-jobs");

    // 선택된 직무가 없을 경우 경고 메시지 표시 후 함수 종료
    if (selectedJobSpans.length === 0) {
        alert("1개 이상 선택해주세요.");
        return;
    }

    // 기존의 모든 <li> 요소 제거
    taskList.innerHTML = '';

    selectedJobSpans.forEach(span => {
        // 첫 번째 값 (기획·전략)과 두 번째 값 (게임기획) 가져오기
        const jobName1 = span.childNodes[0].nodeValue.trim(); // 첫 번째 텍스트 (기획·전략)
        const jobName2 = span.childNodes[2].nodeValue.trim(); // 두 번째 텍스트 (게임기획)

        // 새로운 <li> 요소 생성
        const newListItem = document.createElement('li');
        newListItem.innerHTML = `
            <span class="hope_jobs" style="color:#566feb;">
                ${jobName1}
                <span class="blind">삭제</span>
            </span>
            <span class="hope_jobs">
                ${jobName2}
                <button type="button" class="btn-delete deleteToKeyword">
                    <span class="blind">삭제</span>
                </button>
            </span>
        `;

        // 삭제 버튼에 이벤트 리스너 추가
        const deleteButton = newListItem.querySelector('.btn-delete');
        deleteButton.addEventListener('click', (event) => {
            const li = event.target.closest('li'); // 클릭된 버튼의 가장 가까운 <li> 요소 찾기
            if (li) {
                taskList.removeChild(li); // 해당 <li> 제거
            }
        });

        // <ul>에 <li> 추가
        taskList.appendChild(newListItem);
        targetElement.classList.remove("on");
        boxJobs.style.display = "none";
        boxDetailJobs.style.display = "none";
    });
});





document.getElementById("internshipEndDate").addEventListener("change", validateDates);
document.getElementById("workEndTime").addEventListener("change", validateTimes);

function validateDates() {
    const startDate = document.getElementById("internshipStartDate").value;
    const endDate = document.getElementById("internshipEndDate").value;

    if (startDate && endDate && startDate > endDate) {
        alert("종료일은 시작일 이후여야 합니다.");
        document.getElementById("internshipEndDate").value = "";
    }
}

function validateTimes() {
    const startTime = document.getElementById("workStartTime").value;
    const endTime = document.getElementById("workEndTime").value;

    if (startTime && endTime && startTime >= endTime) {
        alert("근무 종료 시간은 시작 시간 이후여야 합니다.");
        document.getElementById("workEndTime").value = "";
    }
}
// 처음 대카 선택
// 모든 .item-job.depth1-btn-wrapper 요소를 선택
listOverview.addEventListener("click", (event) => {
    const clickedItem = event.target.closest(".item-job.depth1-btn-wrapper");

    if (clickedItem) {
        // 모든 요소에서 'on' 클래스 제거
        listOverview.querySelectorAll(".item-job").forEach(item => item.classList.remove("on"));

        // 클릭된 요소에만 'on' 클래스 추가
        clickedItem.classList.add("on");
    }
});



// // 연도에 따라 월 옵션 설정
// function populateMonthOptions(selectedYear) {
//     const monthSelect = document.getElementById("interviewDateMonth");
//     let months = [];
//
//     // 선택한 연도에 맞게 월 필터링
//     if (selectedYear === "2021") {
//         months = ["11", "12"]; // 2021년은 11월과 12월만 가능
//     } else if (selectedYear === "2024") {
//         months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]; // 2024년은 10월까지만 가능
//     } else {
//         months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]; // 2022년, 2023년은 전체 월 가능
//     }
//
//     // 월 옵션 초기화 및 설정
//     monthSelect.innerHTML = `<option value="">월 선택</option>`;
//     months.forEach((month) => {
//         const option = document.createElement("option");
//         option.value = month;
//         option.text = `${month}월`;
//         monthSelect.appendChild(option);
//     });
// }
//
// // 선택한 연도와 월에 따라 일 옵션 설정
// function populateDayOptions(year, month) {
//     const daySelect = document.getElementById("interviewDateDay");
//     let daysInMonth = 31;
//
//     // 월에 따라 일 수 계산
//     if (["04", "06", "09", "11"].includes(month)) {
//         daysInMonth = 30;
//     } else if (month === "02") {
//         daysInMonth = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28; // 윤년 계산
//     }
//
//     // 일 옵션 초기화 및 설정
//     daySelect.innerHTML = `<option value="">일 선택</option>`;
//     Array.from({ length: daysInMonth }, (_, i) => {
//         const day = String(i + 1).padStart(2, '0');
//         const option = document.createElement("option");
//         option.value = day;
//         option.text = `${day}일`;
//         daySelect.appendChild(option);
//     });
// }
//
// // 시간 옵션 설정 (00시 ~ 23시)
// function populateHourOptions(selectId) {
//     const hourSelect = document.getElementById(selectId);
//     hourSelect.innerHTML = `<option value="">시간 선택</option>`;
//     Array.from({ length: 24 }, (_, i) => {
//         const hour = String(i).padStart(2, '0');
//         const option = document.createElement("option");
//         option.value = hour;
//         option.text = `${hour}시`;
//         hourSelect.appendChild(option);
//     });
// }
//
// // 종료 시간이 시작 시간보다 늦어야 함을 확인
// function validateTimeSelection() {
//     const startHour = document.getElementById("interviewStartHour").value;
//     const endHour = document.getElementById("interviewEndHour").value;
//
//     if (startHour && endHour && endHour <= startHour) {
//         alert("종료 시간은 시작 시간보다 늦어야 합니다.");
//         document.getElementById("interviewEndHour").value = ""; // 잘못된 선택 시 초기화
//     }
// }
//
// // 연도 변경 시 월 및 일 옵션 갱신
// document.getElementById("interviewDateYear").addEventListener("change", (e) => {
//     const year = e.target.value;
//     populateMonthOptions(year); // 선택된 연도에 맞게 월 설정
//
//     const selectedMonth = document.getElementById("interviewDateMonth").value;
//     if (selectedMonth) populateDayOptions(year, selectedMonth); // 선택된 월이 있을 경우 일 갱신
// });
//
// // 월 변경 시 일 옵션 갱신
// document.getElementById("interviewDateMonth").addEventListener("change", (e) => {
//     const year = document.getElementById("interviewDateYear").value;
//     const month = e.target.value;
//     if (year) populateDayOptions(year, month); // 연도와 월에 따라 일 설정
// });
//
// // 시간 선택 시 유효성 검사
// document.getElementById("interviewStartHour").addEventListener("change", validateTimeSelection);
// document.getElementById("interviewEndHour").addEventListener("change", validateTimeSelection);
//
// // 시간 옵션 초기화
// populateHourOptions("interviewStartHour");
// populateHourOptions("interviewEndHour");


//

// 직무,직업쪽 자바스크립트

// 1단계 자바스크립트
// document
//     .querySelector(".btn-add-modify")
//     .addEventListener("click", function () {
//         const jobCategorySection = document.querySelector(
//             ".box-jobs"
//         );

//         if (jobCategorySection.classList.contains("on")) {
//             jobCategorySection.classList.remove("on");
//             jobCategorySection.style.display = "none";
//         } else {
//             jobCategorySection.classList.add("on");
//             jobCategorySection.style.display = "block";
//         }
//     });

// // 2단계: box-jobs와 box-detail-jobs 사이 토글
document.querySelector(".box-jobs").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-job")) {
        const boxJobs = document.querySelector(".box-jobs");
        const boxDetailJobs = document.querySelector(".box-detail-jobs");

        boxJobs.style.display = "none";
        boxDetailJobs.style.display = "block";
    }
});



// // 3단계: box-detail-jobs가 표시되도록 설정
// document.addEventListener("DOMContentLoaded", function () {
//     const boxDetailJobs = document.querySelector(
//         ".box-detail-jobs"
//     );
//     if (boxDetailJobs) {
//         boxDetailJobs.style.display = "none"; // 초기 상태 설정
//     }
// });

// // 버튼 클릭 이벤트 리스너 등록
// document
//     .querySelector(".btn-expand")
//     .addEventListener("click", function () {
//         // dl 태그에 expand 클래스 토글
//         const dlElement = document.querySelector(".row-item");
//         dlElement.classList.toggle("expand");

//         // div.box-onedepth에 on 클래스 토글
//         const boxOnedepth = document.querySelector(
//             ".box-onedepth"
//         );
//         boxOnedepth.classList.toggle("on");

//         // div.row.list에 on 클래스 토글
//         const rowList = document.querySelector(
//             ".row.list"
//         );
//         rowList.classList.toggle("on");
//     });

// 대카 중카 소카 자바스크립트 코드
const categorys = {
    "기획·전략": {
        "직무·직업": [
            "게임기획",
            "경영기획",
            "광고기획",
            "교육기획",
            "기술기획",
            "기획",
            "마케팅기획",
            "문화기획",
            "법인장",
            "브랜드기획",
            "사업기획",
            "상품기획",
            "서비스기획",
            "앱기획",
            "웹기획",
            "인사기획",
            "전략기획",
            "지점관리자",
            "출판기획",
            "컨설턴트",
            "행사기획",
            "CEO",
            "CIO",
            "COO",
            "CSO",
            "CTO",
            "IT컨설팅",
            "PL(프로젝트리더)",
            "PM(프로젝트매니저)",
            "PMO",
            "PO(프로덕트오너)",
        ],
        전문분야: [
            "경영관리",
            "경영분석",
            "경영컨설팅",
            "경영혁신(PI)",
            "금융컨설팅",
            "데이터분석",
            "레벨디자인",
            "리서치",
            "리스크 관리",
            "사업개발",
            "사업관리",
            "사업제휴",
            "스토리보드",
            "시장조사",
            "신사업기획",
            "신사업발굴",
            "실적관리",
            "엑셀러레이팅",
            "예산관리",
            "인큐베이팅",
            "자료조사",
            "조직관리",
            "지속가능경영",
            "창업컨설팅",
            "타당성검토",
            "투자전략",
            "트렌드분석",
            "프로토타이핑",
            "해외법인관리",
            "BPR",
            "BSC",
            "CSR",
            "ESG",
            "ISMP",
            "ISP",
            "KPI관리",
            "M&A",
            "MBO",
            "OKR",
            "RFP(제안요청서)",
            "UI/UX",
        ],
    },
    "마케팅·홍보·조사": {
        "직무·직업": [
            "광고PD",
            "광고마케팅",
            "글로벌마케팅",
            "기업홍보",
            "디지털마케팅",
            "마케팅",
            "마케팅기획",
            "마케팅전략",
            "모바일마케팅",
            "미디어플래너",
            "바이럴마케팅",
            "병원마케팅",
            "브랜드마케팅",
            "블로그마케팅",
            "비즈니스마케팅",
            "스포츠마케팅",
            "오프라인마케팅",
            "온라인마케팅",
            "인플루언서마케팅",
            "제휴마케팅",
            "조사원",
            "체험마케팅",
            "콘텐츠기획",
            "콘텐츠마케팅",
            "콘텐츠에디터",
            "퍼포먼스마케팅",
            "프로덕트마케팅",
            "행사기획",
            "홍보",
            "AD(아트디렉터)",
            "AE(광고기획자)",
            "AM(어카운트매니저)",
            "B2B마케팅",
            "BM(브랜드매니저)",
            "CBO",
            "CD(크리에이티브디렉터)",
            "CMO",
            "CRM마케팅",
            "CW(카피라이터)",
            "MW(메디컬라이터)",
            "SNS마케팅",
        ],
        전문분야: [
            "검색광고",
            "광고주관리",
            "광고캠페인",
            "그로스해킹",
            "라이센싱",
            "매체관리",
            "배너광고",
            "비딩",
            "사보/뉴스레터",
            "사회조사",
            "설문조사",
            "세일즈프로모션",
            "시장조사",
            "언론홍보",
            "옥외광고",
            "이벤트프로모션",
            "채널관리",
            "키워드광고",
            "통계/분석",
            "퍼블리시티",
            "ATL",
            "BTL",
            "IMC",
            "MCN",
            "MICE",
            "PPL",
            "RFP(제안요청서)",
            "SEO",
        ],
    },
    "회계·세무·재무": {
        "직무·직업": [
            "감사",
            "경리",
            "경리사무원",
            "공인회계사",
            "관세사",
            "관세사무원",
            "세무사",
            "재무",
            "전산회계",
            "행정사",
            "회계",
            "회계사",
            "AICPA",
            "CFA",
            "CFO",
            "IR/공시",
            "KICPA",
        ],
        전문분야: [
            "계산서발행",
            "관리회계",
            "급여(Payroll)",
            "기업회계",
            "내부감사",
            "더존",
            "법인결산",
            "법인세신고",
            "부가세신고",
            "세무기장",
            "세무신고",
            "세무조정",
            "세무컨설팅",
            "세무회계",
            "손익관리",
            "신고대리",
            "연결회계",
            "연말정산",
            "예산관리",
            "외부감사",
            "외환관리",
            "원가관리",
            "원가회계",
            "원천세신고",
            "자금관리",
            "자산관리",
            "자산운용",
            "자체기장",
            "재무기획",
            "재무제표",
            "재무회계",
            "전표입력",
            "종합소득세",
            "채권관리",
            "출납",
            "회계결산",
            "ERP",
            "IFRS",
            "IPO",
            "NDR",
            "4대보험",
        ],
        근무장소: [
            "관세법인",
            "세관",
            "세무법인",
            "세무사사무실",
            "해외법인",
            "회계법인",
            "회계사무실",
        ],
    },
    "인사·노무·HRD": {
        "직무·직업": [
            "노무사",
            "인사",
            "잡매니저",
            "직업상담사",
            "채용담당자",
            "헤드헌터",
            "ER(노무관리)",
            "HRD",
            "HRM",
            "HR컨설팅",
        ],
        담당분야: [
            "급여(Payroll)",
            "면접/인터뷰",
            "법정의무교육",
            "복리후생",
            "실적관리",
            "아웃소싱",
            "온보딩",
            "인력관리",
            "인사교육",
            "인사기획",
            "인사행정",
            "인재발굴",
            "임금협상",
            "제증명발급",
            "조직문화",
            "직업훈련",
            "채용공고관리",
            "채용대행",
            "채용설명회",
            "파견관리",
            "평가/보상",
        ],
    },
    "총무·법무·사무": {
        "직무·직업": [
            "법률사무원",
            "법무",
            "법무사",
            "변리사",
            "변호사",
            "비서",
            "사내변호사",
            "사무직",
            "서무",
            "송무비서",
            "수행기사",
            "수행비서",
            "안내데스크",
            "임원비서",
            "총무",
            "컴플라이언스",
            "특허명세사",
        ],
        전문분야: [
            "경영지원",
            "교육행정",
            "기술사업화",
            "내방객응대",
            "문서작성",
            "비품관리",
            "사내행사",
            "사무보조",
            "사무행정",
            "사이트관리",
            "상표관리",
            "서류관리",
            "시설관리",
            "인/허가",
            "자료입력",
            "자료조사",
            "자산관리",
            "전산총무",
            "전화응대",
            "정보처리",
            "제증명발급",
            "콘텐츠관리",
            "타이핑",
            "특허관리",
            "특허분석",
            "특허컨설팅",
            "Excel",
            "IP(지식재산권)",
            "OA",
            "PhotoShop",
            "PowerPoint",
        ],
    },
    "IT개발·데이터": {
        "직무·직업": [
            "개발PM",
            "게임개발",
            "기술지원",
            "데이터 사이언티스트",
            "데이터분석가",
            "데이터엔지니어",
            "백엔드/서버개발",
            "보안관제",
            "보안컨설팅",
            "앱개발",
            "웹개발",
            "웹마스터",
            "유지보수",
            "정보보안",
            "퍼블리셔",
            "프론트엔드",
            "BI 엔지니어",
            "CISO",
            "CPO",
            "DBA",
            "FAE",
            "GM(게임운영)",
            "ICT컨설팅",
            "IT컨설팅",
            "QA/테스터",
            "SE(시스템엔지니어)",
            "SI개발",
            "SQA",
        ],
        전문분야: [
            "검색엔진",
            "네트워크",
            "데이터라벨링",
            "데이터마이닝",
            "데이터시각화",
            "딥러닝",
            "루비온레일즈",
            "머신러닝",
            "메타버스",
            "모델링",
            "모의해킹",
            "미들웨어",
            "반응형웹",
            "방화벽",
            "블록체인",
            "빅데이터",
            "빌링",
            "솔루션",
            "스크립트",
            "신경망",
            "아키텍쳐",
            "악성코드",
            "알고리즘",
            "암호화폐",
            "영상처리",
            "웹표준·웹접근성",
            "음성인식",
            "이미지프로세싱",
            "인터페이스",
            "인프라",
            "임베디드",
            "자율주행",
            "정보통신",
            "챗봇",
            "취약점진단",
            "컴퓨터비전",
            "크로스브라우징",
            "크로스플랫폼",
            "크롤링",
            "클라우드",
            "클라이언트",
            "텍스트마이닝",
            "트러블슈팅",
            "펌웨어",
            "플러그인",
            "핀테크",
            "헬스케어",
            "AI(인공지능)",
            "API",
            "APM",
            "AR(증강현실)",
            "Dapp",
            "DBMS",
            "DevOps",
            "DID",
            "DLP",
            "DW",
            "ERP",
            "ETL",
            "FPGA",
            "GIS",
            "H/W",
            "HTTP",
            "IDC",
            "IIS",
            "IoT",
            "ISMS",
            "MCU",
            "MMORPG",
            "Nginx",
            "NLP(자연어처리)",
            "NLU(자연어이해)",
            "OCR",
            "OLAP",
            "RDBMS",
            "RPA",
            "RTOS",
            "S/W",
            "SAP",
            "SDK",
            "SOA",
            "STT",
            "TTS",
            "UTM",
            "VDI",
            "VMware",
            "VoIP",
            "VPN",
            "VR(가상현실)",
            "WCF",
            "Windows",
        ],
        기술스택: [
            "그누보드",
            "라즈베리파이",
            "쉘스크립트",
            "스마트컨트랙트",
            "아두이노",
            "액션스크립트",
            "어셈블리",
            "와이어샤크",
            "임베디드리눅스",
            "파워빌더",
            "풀스택",
            ".NET",
            "ABAP",
            "AIX",
            "Ajax",
            "Android",
            "Angular",
            "Apache",
            "ArcGIS",
            "ASP",
            "ASP.NET",
            "AWS",
            "Azure",
            "Bootstrap",
            "C#",
            "C++",
            "CentOS",
            "COBOL",
            "CSS",
            "CSS3",
            "C언어",
            "Delphi",
            "Directx",
            "Django",
            "Docker",
            "Eclipse",
            "ECMAScript",
            "ElasticStack",
            "Flask",
            "FLEX",
            "Flutter",
            "GCP",
            "Git",
            "GoLang",
            "GraphQL",
            "Groovy",
            "Gulp",
            "Hadoop",
            "HBase",
            "HTML",
            "HTML5",
            "IaaS",
            "iBATIS",
            "Ionic",
            "iOS",
            "Java",
            "Javascript",
            "Jenkins",
            "JPA",
            "jQuery",
            "JSP",
            "Kafka",
            "Keras",
            "Kotlin",
            "Kubernetes",
            "LabVIEW",
            "Linux",
            "Logstash",
            "Lucene",
            "MacOS",
            "MariaDB",
            "Matlab",
            "Maven",
            "MFC",
            "MongoDB",
            "MSSQL",
            "MyBatis",
            "MySQL",
            "Node.js",
            "NoSQL",
            "Objective-C",
            "OpenCV",
            "OpenGL",
            "OracleDB",
            "OSS",
            "PaaS",
            "Pandas",
            "Perl",
            "PHP",
            "PL/SQL",
            "PostgreSQL",
            "Pro-C",
            "Python",
            "Pytorch",
            "QGIS",
            "Qt",
            "R",
            "React",
            "React-Native",
            "ReactJS",
            "Redis",
            "Redux",
            "RestAPI",
            "Ruby",
            "SaaS",
            "SAS",
            "Scala",
            "Servlet",
            "Solaris",
            "Solidity",
            "Spark",
            "Splunk",
            "Spring",
            "SpringBoot",
            "SQL",
            "SQLite",
            "Storm",
            "Struts",
            "SVN",
            "Swift",
            "Sybase",
            "Tensorflow",
            "Tomcat",
            "TypeScript",
            "Ubuntu",
            "Unity",
            "Unix",
            "Unreal",
            "VB.NET",
            "Verilog",
            "Vert.x",
            "VisualBasic",
            "VisualC·C++",
            "Vue.js",
            "WAS",
            "WebGL",
            "Webpack",
            "WebRTC",
            "WPF",
            "XML",
        ],
    },
    디자인: {
        "직무·직업": [
            "가구디자인",
            "건축디자인",
            "게임디자인",
            "경관디자인",
            "공간디자인",
            "공공디자인",
            "공예디자인",
            "광고디자인",
            "그래픽디자인",
            "그림작가",
            "디지털디자인",
            "로고디자인",
            "모바일디자인",
            "무대디자인",
            "문구디자인",
            "배너디자인",
            "북디자인",
            "브랜드디자인",
            "산업디자인",
            "섬유디자인",
            "시각디자인",
            "실내디자인",
            "애니메이터",
            "앱디자인",
            "영상디자인",
            "완구디자인",
            "웹디자인",
            "의상디자인",
            "일러스트레이터",
            "자동차디자인",
            "잡화디자인",
            "전시디자인",
            "정보디자인",
            "조명디자인",
            "주얼리디자인",
            "캐릭터디자인",
            "컨셉디자인",
            "컬러리스트",
            "콘텐츠디자인",
            "패브릭디자인",
            "패키지디자인",
            "패턴디자인",
            "편집디자인",
            "폰트디자인",
            "표지디자인",
            "프로모션디자인",
            "환경디자인",
            "AD(아트디렉터)",
            "BI디자인",
            "BX디자인",
            "CI디자인",
            "UI/UX디자인",
            "VMD",
        ],
        전문분야: [
            "가방",
            "간판",
            "남성의류",
            "니트",
            "데님",
            "도트/픽셀아트",
            "드로잉",
            "라이팅",
            "렌더링",
            "리플렛",
            "만화/웹툰",
            "명함",
            "모델링",
            "모션그래픽",
            "보정/리터칭",
            "브로슈어",
            "삽화",
            "상세페이지",
            "색보정",
            "샘플링",
            "속옷",
            "스포츠의류",
            "신발",
            "썸네일",
            "아동복",
            "아트워크",
            "어셋",
            "여성의류",
            "옥외광고",
            "우븐",
            "원화",
            "이모티콘",
            "인테리어",
            "인포그래픽",
            "자막",
            "작화",
            "잡지",
            "제안서",
            "조형물",
            "주방용품",
            "채색",
            "카드뉴스",
            "카탈로그",
            "캘리그라피",
            "컨셉아트",
            "타이포그래피",
            "템플릿",
            "팜플렛",
            "페인팅",
            "포스터",
            "프랍",
            "피규어",
            "합성",
            "현수막",
            "홈패션/홈데코",
            "홍보물",
            "CG",
            "DTP",
            "GUI",
            "POP",
            "SIGN",
            "VFX",
            "2D디자인",
            "3D디자인",
        ],
        작업Tool: [
            "드림위버",
            "라이노",
            "베가스",
            "스케치업",
            "애프터이펙트",
            "인디자인",
            "일러스트",
            "지브러쉬",
            "코렐드로우",
            "파이널컷",
            "프리미어",
            "플래시",
            "Blender",
            "CAD",
            "Cinema4D",
            "Figma",
            "FLEX",
            "HTML",
            "Keyshot",
            "Maya",
            "PhotoShop",
            "QuarkXpress",
            "Sketch",
            "Substance",
            "TexPro",
            "Unity",
            "Unreal",
            "V-Ray",
            "XD",
            "Zeplin",
            "3DMax",
        ],
    },
    "영업·판매·무역": {
        "직무·직업": [
            "가구판매",
            "가전판매",
            "건강식품판매",
            "건설영업",
            "관세사",
            "관세사무원",
            "광고영업",
            "국제무역사",
            "귀금속판매",
            "기계판매",
            "기술영업",
            "네트워크영업",
            "무역MR",
            "무역경리",
            "무역사무원",
            "무역중개인",
            "방문판매",
            "보세사",
            "보안솔루션영업",
            "부동산영업",
            "상조영업",
            "샵마스터",
            "솔루션기술영업",
            "시스템영업",
            "식품/음료영업",
            "식품/음료판매",
            "영업",
            "영업MD",
            "영업관리",
            "영업기획",
            "영업마케팅",
            "영업전략",
            "영업지원",
            "영업직",
            "영업판촉",
            "온라인판매",
            "원산지관리사",
            "의료기기영업",
            "의류무역",
            "의류판매",
            "자동차딜러",
            "자동차영업",
            "자재판매",
            "잡화판매",
            "장비영업",
            "정육판매",
            "제약영업",
            "주류영업",
            "주류판매",
            "증권영업",
            "축산물판매",
            "캐셔",
            "컴퓨터판매",
            "타이어판매",
            "통신기기판매",
            "티켓판매",
            "판매직",
            "포워더",
            "항공무역",
            "해상무역",
            "해외시장개척",
            "해외영업",
            "핸드폰판매",
            "호텔영업",
            "화장품영업",
            "화장품판매",
            "IT영업",
            "SI영업",
        ],
        담당분야: [
            "가맹점관리",
            "가맹점영업",
            "거래처관리",
            "거래처납품",
            "거래처영업",
            "고객관리",
            "공공영업",
            "관세환급",
            "기업영업",
            "렌탈영업",
            "마트영업",
            "매장관리",
            "매체영업",
            "매출관리",
            "무역거래",
            "무역영어",
            "바이어발굴/관리",
            "백화점영업",
            "벤더관리",
            "부품수출",
            "쇼핑몰관리",
            "수/발주",
            "수출입",
            "실적관리",
            "아울렛영업",
            "여행사영업",
            "온라인영업",
            "유통영업",
            "장기렌트영업",
            "점포개발",
            "정산관리",
            "주문관리",
            "진열관리",
            "통관",
            "학원영업",
            "해외영업관리",
            "해외영업지원",
            "핸드폰영업",
            "홈쇼핑영업",
            "B2B",
            "B2C",
        ],
    },
    "고객상담·TM": {
        "직무·직업": [
            "상담원",
            "섭외TM",
            "아웃바운드",
            "이미지컨설턴트",
            "인바운드",
            "텔레마케터",
            "CS",
            "CX매니저",
        ],
        담당분야: [
            "게시판관리",
            "고객관리",
            "교육상담",
            "교환/반품",
            "기술상담",
            "단순안내",
            "대출상담",
            "메일상담",
            "민원상담",
            "방문상담",
            "배송상담",
            "상담품질관리",
            "원격상담",
            "전화상담",
            "접수/예약",
            "주문상담",
            "채팅상담",
            "콜센터/고객센터",
            "콜통계/분석",
            "통화품질분석",
            "해지방어",
            "해피콜",
            "A/S상담",
            "VOC분석",
        ],
    },
    "구매·자재·물류": {
        "직무·직업": [
            "구매",
            "구매관리",
            "구매기획",
            "국제물류",
            "물류관리",
            "물류기획",
            "물류사무원",
            "보세사",
            "유통관리",
            "자재관리",
            "재고관리",
            "창고관리",
            "포워더",
            "품질관리",
            "SCM",
            "SRM",
        ],
        전문분야: [
            "개발구매",
            "거래처관리",
            "검품/검수",
            "견적관리",
            "구매대행/소싱",
            "납기관리",
            "물류자동화",
            "배차관리",
            "보세구역관리",
            "보세화물관리",
            "상하차",
            "선적",
            "수/발주",
            "수급관리",
            "수불관리",
            "양산구매",
            "외자구매",
            "외주관리",
            "원가관리",
            "입고/입하",
            "자재구매",
            "적재/하역",
            "전략구매",
            "정산관리",
            "조달구매",
            "집하/분류",
            "출고/출하",
            "패킹(포장)",
            "피킹(집품)",
            "화물관리",
            "ERP",
            "MRO",
            "WMS",
            "3PL운영",
        ],
    },
    "상품기획·MD": {
        "직무·직업": [
            "기획MD",
            "리테일MD",
            "바잉MD",
            "브랜드MD",
            "슈퍼바이저",
            "식품MD",
            "영업MD",
            "오프라인MD",
            "온라인MD",
            "유통MD",
            "패션MD",
            "AMD",
            "VMD",
        ],
        담당분야: [
            "가공식품",
            "가구",
            "건강기능식품",
            "결품관리",
            "구매총괄",
            "남성의류",
            "납기관리",
            "로드샵",
            "리빙",
            "매출관리",
            "면세점",
            "문구",
            "백화점",
            "브랜드관리",
            "브랜드기획",
            "브랜드런칭",
            "브랜드확장",
            "브랜딩",
            "상품관리",
            "상품분석",
            "생활용품",
            "소셜커머스",
            "쇼핑몰",
            "스포츠용품",
            "스포츠의류",
            "시장조사",
            "시판",
            "식품",
            "아동복",
            "아이템선정",
            "여성의류",
            "영캐주얼",
            "오픈마켓",
            "완구",
            "유아용품",
            "이커머스",
            "자사몰관리",
            "전자제품",
            "제작관리",
            "주방",
            "주얼리/액세서리",
            "채널관리",
            "트렌드분석",
            "판매전략",
            "팝업스토어관리",
            "패션브랜드",
            "패션잡화",
            "퍼니싱",
            "편집샵",
            "프로모션기획",
            "홈쇼핑",
            "홈패션/홈데코",
            "화장품",
            "회원분석",
            "CS관리",
            "POP",
            "SNS",
            "SRM",
        ],
    },
    "운전·운송·배송": {
        "직무·직업": [
            "납품운전원",
            "대리운전",
            "라이더(배달원)",
            "물류기사",
            "배송기사",
            "배차관리",
            "버스기사",
            "보세운송",
            "사택기사",
            "선적",
            "셔틀버스기사",
            "수행기사",
            "승합기사",
            "운전",
            "육상운송",
            "적재/하역",
            "조종사",
            "지상조업",
            "지입",
            "차량도우미",
            "철도운송",
            "퀵서비스",
            "탁송기사",
            "택배기사",
            "택시기사",
            "통관",
            "포워더",
            "포장이사",
            "항공운송",
            "해상운송",
        ],
        운송수단: [
            "견인차",
            "선박",
            "소형화물",
            "오토바이",
            "윙바디",
            "탑차",
            "탱크로리",
            "트럭",
            "트레일러",
            "특수차량",
            "화물차(카고)",
            "1톤",
            "2.5톤",
            "3.5톤",
            "4.5톤",
            "5톤이상",
        ],
        중장비: [
            "덤프트럭",
            "로우더",
            "믹서트럭(레미콘)",
            "암롤",
            "전동지게차",
            "지게차",
            "집게차",
            "컨테이너크레인",
            "크레인",
            "포크레인(굴삭기)",
            "호이스트",
        ],
    },
    서비스: {
        "직무·직업": [
            "가사도우미",
            "가전제품설치",
            "검침원",
            "경비원",
            "경비지도사",
            "경호원",
            "관광가이드",
            "관광통역안내사",
            "나레이터",
            "네일리스트",
            "두피관리사",
            "라이더(배달원)",
            "룸메이드",
            "매장매니저",
            "매표/검표",
            "미용사",
            "미화원",
            "바리스타",
            "바텐더",
            "발레파킹",
            "벨멘/도어맨",
            "보석감정사",
            "보안요원",
            "부주방장",
            "뷰티매니저",
            "산후도우미",
            "세차원",
            "소믈리에",
            "스타일리스트",
            "승무원",
            "아쿠아리스트",
            "안내데스크",
            "안전요원",
            "애견미용",
            "애견훈련",
            "양조사",
            "영양사",
            "왁서",
            "요리사",
            "웨딩플래너",
            "육아도우미",
            "입주도우미",
            "장례지도사",
            "정비기사",
            "제과/제빵사",
            "조리사",
            "주방보조",
            "주방장",
            "주유원",
            "주차요원",
            "지배인",
            "지상직",
            "차량도우미",
            "체형관리사",
            "카페매니저",
            "캐셔",
            "커뮤니티매니저",
            "커플매니저",
            "탁송기사",
            "테라피스트",
            "파티쉐",
            "파티플래너",
            "푸드스타일리스트",
            "프로모터",
            "플로리스트",
            "피부관리사",
            "하우스맨",
            "해설가",
            "행사도우미",
            "호텔리어",
            "홀매니저",
            "홀서빙",
            "A/S기사",
            "GRO(컨시어지)",
        ],
        전문분야: [
            "객실관리",
            "고객안내",
            "고객응대",
            "광택",
            "기계수리",
            "다이어트",
            "동물관리",
            "동물장례",
            "라운딩",
            "렌탈",
            "마사지",
            "매장관리",
            "메이크업",
            "면세품인도",
            "발권",
            "방범",
            "설비점검",
            "세탁",
            "소독",
            "속눈썹",
            "시설관리",
            "식단관리",
            "썬팅",
            "요금정산",
            "의류수선",
            "인터넷설치",
            "자동차도장",
            "자동차정비",
            "자동차튜닝",
            "접수/예약",
            "청소",
            "출력/제본/복사",
            "케이터링",
            "펜션관리",
            "프론트",
            "필터교체",
            "해충방제",
            "현금호송",
            "LPG충전",
        ],
        근무장소: [
            "공항",
            "관리사무소",
            "급식소",
            "네일샵",
            "대형마트",
            "드레스샵",
            "리조트",
            "미용실",
            "백화점",
            "서점",
            "식당",
            "에스테틱/스파",
            "여객선",
            "여행사",
            "영화관",
            "웨딩스튜디오",
            "웨딩홀",
            "장례식장",
            "주방",
            "주유소",
            "카지노",
            "카페",
            "콘도",
            "키즈카페",
            "항공사",
            "호텔",
        ],
    },
    생산: {
        "직무·직업": [
            "계장설계",
            "공장장",
            "공정관리",
            "공정설계",
            "공정엔지니어",
            "구조해석/설계",
            "금형설계",
            "기계설계",
            "기계조작원",
            "기구설계",
            "기술설계",
            "기술엔지니어",
            "단순생산직",
            "미싱사",
            "반도체설계",
            "부품설계",
            "생산",
            "생산관리",
            "생산기술",
            "생산설계",
            "설계엔지니어",
            "설비OP",
            "세공사",
            "시스템설계",
            "안전보건관리자",
            "외관검사원",
            "용접원",
            "자동제어",
            "자동화설계",
            "장비설계",
            "장비제어",
            "재단사",
            "전기설계",
            "전기제어",
            "전자제어",
            "전장설계",
            "절단가공",
            "절삭가공",
            "제관사",
            "제조",
            "제조가공",
            "제품설계",
            "조색사",
            "조선설계",
            "캐드원",
            "펌프설계",
            "품질검사원",
            "품질관리",
            "프로그램설계",
            "플랜트설계",
            "항공정비",
            "회로설계",
            "PSM",
            "QA",
            "QC",
        ],
        전문분야: [
            "계측기교정",
            "계측제어",
            "공구연마",
            "공구연삭",
            "광학/렌즈",
            "그라비아인쇄",
            "금속",
            "납땜",
            "농업",
            "다이캐스팅",
            "도료/페인트",
            "도면해독",
            "도장/도금/도색",
            "드릴링",
            "디스플레이",
            "레이저가공",
            "마스터캠",
            "메카트로닉스",
            "목재",
            "목형",
            "바닥재",
            "박스제조",
            "박판용접",
            "반도체",
            "방적/방사",
            "방전가공",
            "배관용접",
            "배합",
            "불량분석",
            "브러쉬",
            "비금속/요업",
            "사상/래핑",
            "사출금형",
            "사출성형",
            "샌딩",
            "생산자동화",
            "석유화학",
            "선박엔진",
            "설계보조",
            "섬유/의류",
            "세척밸리데이션",
            "솔리드엣지",
            "솔리드웍스",
            "스마트팩토리",
            "식품",
            "실링",
            "실크인쇄",
            "아노다이징",
            "아크릴가공",
            "아크용접",
            "알곤용접",
            "압연",
            "압출성형",
            "에너지관리",
            "에칭",
            "열처리",
            "열해석",
            "와이어컷팅",
            "유동해석",
            "인발",
            "인벤터",
            "인서트",
            "자동용접",
            "자동차",
            "자동화라인",
            "작물재배",
            "장비/공구",
            "전계장",
            "전기용접",
            "제련",
            "제약/바이오",
            "조립",
            "주얼리/액세서리",
            "주조/단조",
            "증착",
            "충진",
            "칭량",
            "코팅",
            "터닝",
            "파워밀",
            "판금",
            "패션잡화",
            "펀칭",
            "펌웨어",
            "편조",
            "평면연마",
            "평면연삭",
            "포밍",
            "포장",
            "품질보증",
            "품질분석",
            "프레스금형",
            "플라스틱",
            "하이퍼밀",
            "합형",
            "항공기",
            "화공약품",
            "화장품",
            "후가공",
            "Altium",
            "ASIC",
            "AutoCAD",
            "AUTOSAR",
            "BBT",
            "BLU",
            "CAD",
            "CATIA",
            "Co2용접",
            "Creo(Pro-E)",
            "CVD",
            "EDA",
            "ERP",
            "FA(공장자동화)",
            "FPCB",
            "FPGA",
            "H/W",
            "Haccp",
            "HMI",
            "LCD",
            "LED",
            "MEMS",
            "MES",
            "NX(UG)",
            "OLED",
            "OrCAD",
            "Pads",
            "PCB",
            "PSpice",
            "PVC",
            "PVD",
            "S/W",
            "SMPS",
            "SMT",
            "Sputter",
            "Tribon",
            "Verilog",
            "VHDL",
            "2D설계",
            "3D설계",
            "3차원측정",
        ],
        작업도구: [
            "감속기",
            "고속가공기",
            "라우터",
            "레디알",
            "범용밀링",
            "범용보링",
            "범용선반",
            "변압기",
            "복합기",
            "성형기",
            "세륜기",
            "압출기",
            "연마기",
            "연삭기",
            "자동선반",
            "절곡기",
            "지그",
            "천공기",
            "톱기계",
            "파쇄기/분쇄기",
            "프레스",
            "CAM",
            "MCT",
            "NC/CNC밀링",
            "NC/CNC보링",
            "NC/CNC선반",
            "NCT",
            "PLC",
            "3축가공기",
            "5축가공기",
        ],
        근무형태: [
            "상주근무",
            "야간근무",
            "일용직",
            "입식근무",
            "좌식근무",
            "주간근무",
            "2교대",
            "3교대",
        ],
    },
    "건설·건축": {
        "직무·직업": [
            "가스기능사",
            "감리원",
            "감정평가사",
            "건물관리자",
            "건설견적원",
            "건설경리",
            "건축가",
            "건축구조설계",
            "건축기사",
            "검침원",
            "공무",
            "공인중개사",
            "공조냉동기사",
            "기계기사",
            "기술도해사",
            "기전기사",
            "내선전공",
            "내진설계",
            "다기능공",
            "대기환경기사",
            "도시설계",
            "도장공",
            "목공",
            "방수공",
            "배관공",
            "배관설계",
            "배전반설계",
            "보건관리자",
            "보일러기사",
            "보조공",
            "분양상담사",
            "비파괴검사원",
            "산림기사",
            "산림설계",
            "설계보조",
            "설계엔지니어",
            "소방설계",
            "수자원설계",
            "수질환경기사",
            "시공관리자",
            "시공기사",
            "신호수",
            "안전관리자",
            "안전보건관리자",
            "용접부",
            "작업반장",
            "전기기사",
            "전기설계",
            "전산/기술직",
            "제관사",
            "조경설계",
            "중개보조원",
            "지역개발컨설팅",
            "취부사",
            "캐드원",
            "토목기술자",
            "토목설계",
            "토양환경기사",
            "통신설계",
            "폐기물처리기사",
            "현장관리자",
            "현장기사",
            "환경관리자",
            "환경설계",
            "CM(건설사업관리)",
            "QA",
            "QC",
            "2D설계",
            "3D설계",
        ],
        전문분야: [
            "가스설비",
            "간판시공",
            "강구조",
            "건설관리",
            "건설노무",
            "건조설비",
            "건축설계",
            "건축설비",
            "건축전기",
            "경량철골",
            "골조",
            "공조설비",
            "관급공사",
            "교량/가설",
            "굴착",
            "그라우팅",
            "단열",
            "대기측정분석",
            "덕트",
            "도배/벽지",
            "도시가스",
            "도시개발",
            "도시교통",
            "리모델링",
            "마감재",
            "마루",
            "미장",
            "바닥재",
            "반송설비",
            "방사선안전관리",
            "방음/방벽",
            "벌목",
            "부대토목",
            "부동산",
            "분전반",
            "빌트인",
            "산업설비",
            "산업플랜트",
            "상/하수도",
            "샵드로잉",
            "석공사",
            "석면조사",
            "석재",
            "설비보수",
            "소방/방재",
            "소음/진동",
            "수장공사",
            "수치해석",
            "스케치업",
            "시설관리",
            "실내건축시공",
            "실내공기질측정",
            "아크용접",
            "아파트건축",
            "에너지관리",
            "에폭시",
            "엘리베이터",
            "열교환기",
            "영선",
            "옹벽",
            "욕실",
            "위생설비",
            "위험성평가",
            "유리시공",
            "인테리어공사",
            "자동문",
            "자동제어",
            "작업환경측정",
            "잡철",
            "전계장",
            "전기설비",
            "전기시공",
            "전기제어",
            "조경공사",
            "지역개발",
            "차선도색",
            "창호/샤시",
            "철골공사",
            "철근콘크리트",
            "측량/계측",
            "친환경건축",
            "커튼월",
            "컬러링",
            "케이블설치",
            "타일시공",
            "토목건축",
            "토목공사",
            "토목공학",
            "통신공사",
            "파이프",
            "판넬시공",
            "폐수처리장관리",
            "플랜트건설",
            "플랜트설비",
            "플랜트전기",
            "플랜트토목",
            "플레이트",
            "필름시공",
            "하자보수",
            "하자진단",
            "하천",
            "해양조사",
            "홈인테리어",
            "화학플랜트",
            "환경분석",
            "환경영향평가",
            "환경플랜트",
            "Abaqus",
            "AutoCAD",
            "BIM",
            "CCTV공사",
            "HVAC",
            "TEKLA",
            "3DMax",
        ],
        작업도구: [
            "계전기",
            "광파기",
            "용접기",
            "천공기",
            "크레인",
            "트윈모션",
            "CAD",
            "Navisworks",
            "Revit",
        ],
    },
    의료: {
        의료전문직: [
            "간호사",
            "간호조무사",
            "놀이치료사",
            "도수치료사",
            "마취간호사",
            "물리치료사",
            "미술치료사",
            "방사선사",
            "보건의료정보관리사",
            "보험심사청구사",
            "산업간호사",
            "상담간호사",
            "수간호사",
            "수의사",
            "수의테크니션",
            "심리치료사",
            "심사간호사",
            "안경사",
            "약사",
            "언어치료사",
            "운동치료사",
            "음악치료사",
            "의공기사",
            "의사",
            "인지치료사",
            "임상병리사",
            "임상심리사",
            "작업치료사",
            "재활치료사",
            "전공의",
            "전문의",
            "책임간호사",
            "청능사/청각사",
            "초음파사",
            "치과위생사",
            "치기공사",
            "한약사",
            "한의사",
            "CRA(임상연구원)",
            "CRC(연구간호사)",
            "CRM(임상연구전문가)",
            "QPS간호사",
        ],
        의료종사직: [
            "간병인",
            "구급차기사",
            "두피관리사",
            "병동보호사",
            "병원경리",
            "병원총무",
            "병원코디네이터",
            "병원행정사",
            "보건관리자",
            "비만관리사",
            "상담실장",
            "심리운동사",
            "약국전산원",
            "영양사",
            "요양보호사",
            "운동처방사",
            "위생사",
            "응급구조사",
            "의지보조기기사",
            "정신과보호사",
            "MR",
        ],
        전문분야: [
            "기능검사",
            "드레싱보조",
            "모발이식",
            "방문간호",
            "병원경영",
            "병원관리",
            "보건진단",
            "수술",
            "수술보조",
            "스포츠마사지",
            "외래",
            "원무",
            "의료영상",
            "의약사무",
            "임상시험",
            "입원관리",
            "접수/예약",
            "제약QA",
            "조제보조",
            "조직병리",
            "진료보조",
            "채혈",
            "처방",
            "침구실보조",
            "행동치료",
            "환자안내",
            "환자이송",
            "RA",
        ],
        진료과: [
            "가정의학과",
            "감염내과",
            "구강내과",
            "구강외과",
            "내과",
            "내분비내과",
            "대장항문외과",
            "마취통증의학과",
            "병리과",
            "비뇨기과",
            "산부인과",
            "성형외과",
            "소아과",
            "소화기내과",
            "순환기내과",
            "신경외과",
            "신장내과",
            "안과",
            "알레르기내과",
            "약제과",
            "영상의학과",
            "외과",
            "이비인후과",
            "재활의학과",
            "정신과",
            "정형외과",
            "직업환경의학과",
            "진단검사의학과",
            "치과",
            "통증의학과",
            "피부과",
            "한방과",
            "핵의학과",
            "혈액종양내과",
            "호흡기내과",
            "흉부외과",
        ],
        근무장소: [
            "개인병원",
            "검진센터",
            "내시경실",
            "노인전문병원",
            "대학병원",
            "동물병원",
            "보건소",
            "비만클리닉",
            "산후조리원",
            "신생아실",
            "심혈관센터",
            "아동병원",
            "암센터",
            "약국",
            "여성병원",
            "여성의원",
            "요양병원",
            "응급실",
            "인공신장실",
            "일반병원",
            "재활센터",
            "정신병원",
            "종합병원",
            "주사실",
            "주야간보호센터",
            "중환자실",
            "처치실",
            "척추병원",
            "촬영실",
            "치과병원",
            "치과의원",
            "한방병원",
            "한의원",
            "혈액원",
            "호스피스",
            "회복실",
        ],
        근무형태: [
            "당직",
            "D-Keep",
            "D/E",
            "D/N",
            "E-Keep",
            "E/N",
            "N-Keep",
            "S-Keep",
            "2교대",
            "3교대",
        ],
    },
    "연구·R&D": {
        "직무·직업": [
            "대기측정분석사",
            "로봇엔지니어",
            "연구원",
            "인증심사원",
            "임상DM",
            "임상PM",
            "임상STAT",
            "환경측정분석사",
            "CRA(임상연구원)",
            "CRC(연구간호사)",
            "CRM(임상연구전문가)",
            "R&D",
            "R&D기획",
        ],
        전문분야: [
            "고분자",
            "광학설계",
            "기술연구",
            "기후변화",
            "농업",
            "도료/페인트",
            "동물실험",
            "로봇설계",
            "메뉴개발",
            "무인항공기/드론",
            "미생물",
            "바이러스",
            "반도체",
            "분자진단",
            "생명과학",
            "세포배양",
            "세포실험",
            "수질분석",
            "시료분석",
            "시료채취",
            "식품연구",
            "신소재",
            "신재생에너지",
            "실험보조",
            "알고리즘개발",
            "원자력",
            "유기합성",
            "유전자",
            "유해화학물질",
            "의료기기연구",
            "의약외품연구",
            "이미지프로세싱",
            "이화학시험",
            "임상개발",
            "임상시험",
            "자율주행",
            "전자파",
            "정책연구",
            "제약/바이오",
            "제제연구",
            "제형연구",
            "줄기세포",
            "토양환경",
            "학술연구",
            "환경오염",
            "AI(인공지능)",
            "FT-IR분석",
        ],
    },
    교육: {
        "직무·직업": [
            "공부방교사",
            "과외",
            "교관",
            "교수설계",
            "교육운영",
            "교육컨설턴트",
            "교육컨텐츠개발",
            "교육컨텐츠기획",
            "교재개발",
            "교직원",
            "대학강사",
            "돌봄교사",
            "바리스타강사",
            "방과후교사",
            "방문교사",
            "보건강사",
            "보육교사",
            "보조강사",
            "상담교사",
            "원어민강사",
            "입학사정관",
            "조교",
            "직업훈련",
            "청소년지도사",
            "컴퓨터교육",
            "코치",
            "특수교사",
            "파트강사",
            "퍼포먼스강사",
            "평생교육사",
            "학습매니저",
            "학원강사",
            "학원보조",
            "훈련교사",
            "CS강사",
            "IT강사",
        ],
        전문분야: [
            "교구수업",
            "기업교육",
            "동화구연",
            "미대입시",
            "수능강의",
            "영어교재",
            "온라인교육",
            "요양보호사교육",
            "유아교육",
            "이러닝",
            "인성교육",
            "인큐베이팅",
            "입시컨설팅",
            "진로상담",
            "체대입시",
            "쿠킹클래스",
            "학생지도",
            "학습상담",
            "학습지",
            "학원생관리",
            "LMS",
        ],
        근무장소: [
            "간호학원",
            "검정고시학원",
            "고등학교",
            "공무원학원",
            "국제학교",
            "대안학교",
            "대학교",
            "대학원",
            "도서관",
            "문화센터",
            "미용학원",
            "방과후학교",
            "보습학원",
            "복지시설",
            "상담센터",
            "속셈학원",
            "승무원학원",
            "아동센터",
            "어린이집/유치원",
            "어학원",
            "요리학원",
            "운전학원",
            "유아놀이학원",
            "유아영어학원",
            "유학원",
            "입시학원",
            "중학교",
            "직업전문학교",
            "초등학교",
        ],
        교육과목: [
            "게임개발",
            "경제",
            "공연예술",
            "과학",
            "국어",
            "기술가정",
            "네일아트",
            "논술/글쓰기",
            "농구",
            "댄스",
            "도덕",
            "디자인",
            "만화/웹툰",
            "메이크업",
            "메카트로닉스",
            "물리",
            "미술",
            "발레",
            "사회",
            "생물",
            "생활체육",
            "세계사",
            "수영",
            "수학",
            "스피치",
            "애니메이션",
            "연극",
            "영어",
            "윤리",
            "음악",
            "일본어",
            "전산회계",
            "정보보호교육",
            "제2외국어",
            "중국어",
            "지구과학",
            "지리",
            "코딩",
            "태권도",
            "피아노",
            "한국사",
            "한국어",
            "한문",
            "화학",
            "CG",
        ],
    },
    "미디어·문화·스포츠": {
        "직무·직업": [
            "가수",
            "기상캐스터",
            "기술감독",
            "기자",
            "도슨트",
            "리포터",
            "방송BJ",
            "방송엔지니어",
            "사운드엔지니어",
            "선수",
            "성우",
            "쇼호스트",
            "스크립터",
            "스포츠강사",
            "스포츠에이전트",
            "아나운서",
            "에디터",
            "연예매니저",
            "영상디자이너",
            "영화감독",
            "영화기획",
            "영화미술",
            "영화제작",
            "음반기획",
            "음반유통",
            "인플루언서",
            "작가",
            "작곡",
            "재활치료사",
            "촬영감독",
            "캐디",
            "캐스팅매니저",
            "컬러리스트",
            "코치",
            "큐레이터",
            "크리에이터",
            "테크니컬라이터",
            "통/번역",
            "트레이너",
            "패션모델",
            "포토그래퍼",
            "프리뷰어",
            "피팅모델",
            "해설가",
            "AD(아트디렉터)",
            "AE(광고기획자)",
            "CW(카피라이터)",
            "DJ",
            "FC(피트니스카운셀러)",
            "MC",
            "PD/AD/FD",
            "VJ",
        ],
        전문분야: [
            "골프",
            "공연기획",
            "공연예술",
            "교열",
            "국악",
            "나레이션",
            "농구",
            "뉴미디어",
            "당구",
            "댄스",
            "드라마",
            "라이브커머스",
            "레저",
            "레크레이션",
            "만화/웹툰",
            "모델에이전시",
            "무대제작",
            "문화재",
            "뮤지컬",
            "미디어플래너",
            "미술관",
            "바이올린",
            "박물관",
            "발레",
            "방송송출",
            "배구",
            "배드민턴",
            "보정/리터칭",
            "보조출연",
            "보컬레슨",
            "복싱",
            "볼링",
            "생활체육",
            "수영",
            "순수미술",
            "스토리텔링",
            "승마",
            "신문",
            "실용음악학원",
            "애니메이션",
            "야구",
            "에어로빅",
            "엔터테인먼트",
            "영상자막",
            "영상제작",
            "영상편집",
            "영어",
            "영화",
            "요가",
            "원고작성",
            "유튜브",
            "음악회",
            "음원",
            "인제스트/인코딩",
            "일본어",
            "잡지",
            "재즈",
            "제2외국어",
            "조명",
            "중국어",
            "첼로",
            "촬영",
            "촬영보조",
            "축구",
            "콘서트",
            "크로스핏",
            "태권도",
            "테마파크",
            "편성",
            "포스트프로덕션",
            "피아노",
            "필라테스",
            "합창",
            "헬스",
            "A&R",
            "CF광고",
            "e-Sports",
            "TV",
            "VOD서비스",
        ],
    },
    "금융·보험": {
        "직무·직업": [
            "금융사무",
            "금융상품영업",
            "대출상담사",
            "보험상담",
            "보험상품개발",
            "보험설계사",
            "보험심사",
            "손해사정사",
            "심사역",
            "애널리스트",
            "텔러",
            "펀드매니저",
        ],
        전문분야: [
            "기업금융",
            "기업분석",
            "기업심사",
            "담보대출",
            "대출심사",
            "배상",
            "배상책임",
            "보험사고",
            "보험청구",
            "부동산투자",
            "손해보험",
            "손해평가",
            "신탁",
            "여신심사",
            "외환관리",
            "위험관리",
            "위험분석",
            "자산운용",
            "재무분석",
            "재물손해사정",
            "주식영업",
            "주식투자",
            "채권관리",
            "채권추심",
            "투자검토",
            "투자분석",
            "투자심사",
            "투자자문",
            "투자자산",
            "펀드",
            "환전",
            "DCM",
            "ECM",
            "NPL",
            "PF영업",
        ],
        금융기관: [
            "공제기관",
            "사금융권",
            "생명보험사",
            "선물중개회사",
            "손해보험사",
            "일반은행",
            "자산운용사",
            "저축은행",
            "제2금융권",
            "증권사",
            "투자자문사",
            "특수은행",
        ],
    },
    "공공·복지": {
        "직무·직업": [
            "감각통합치료사",
            "군인·부사관",
            "도서관사서",
            "돌봄교사",
            "목회자",
            "병역특례",
            "보호상담원",
            "사무국장",
            "사무직",
            "사회복지사",
            "생활복지사",
            "생활지도원",
            "생활지원사",
            "심리치료사",
            "언어치료사",
            "요양보호사",
            "임기제공무원",
            "재활교사",
            "직업상담사",
            "청소년지도사",
            "캠페이너",
            "특수교사",
            "평생교육사",
            "활동지원사",
        ],
        전문분야: [
            "가족상담",
            "노인복지",
            "놀이치료",
            "도서관리",
            "미술치료",
            "방과후아카데미",
            "방문목욕",
            "방문요양",
            "사례관리",
            "아동보육",
            "아동복지",
            "음악치료",
            "인지치료",
            "자원봉사",
            "작업치료",
            "장애인복지",
            "청소년복지",
            "호스피스",
            "EAP상담",
            "MARC구축",
        ],
    },
};

// let text = ``;
// Object.keys(categorys).forEach((categoryA) => {
//     text += `
//             <li
//                 class="item-job depth1-btn-wrapper on"
//                 data-mcls-cd-no="16"
//             >
//                 <button
//                     type="button"
//                     data-mcls-cd-no="16"
//                     class="first-depth"
//                 >
//                     <span
//                         class="txt"
//                         >${categoryA}</span
//                     >
//                 </button>
//             </li>
//                 `;
//     Object.keys(categorys[categoryA]).forEach((categoryB) => {
//         text += `
//                     <dt>
//                         <button>
//                             <span>${categoryB}</span>
//                         </button>
//                     </dt>
//                 `;
//         categorys[categoryA][categoryB].forEach((categoryC) => {
//             text += `
//                     <dd>
//                         <button>${categoryC}</button>
//                     </dd>
//                 `;
//         });
//     });
// });

// console.log(text);
