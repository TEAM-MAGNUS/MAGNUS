# [teammagnus.net](https://teammagnus.net)
 

## Member & Role
* 이창진: 프로젝트 총괄, 디자인, 서버, 프론트엔드, 백엔드

* 정규용: 프론트엔드, 백엔드(로그인, 출석체크)

## Project Goal
1. 팀마그누스 동아리원들의 출석을 관리하는 사이트 제작
2. 팀마그누스 운영진들의 동아리 운영을 도와주는 전용 페이지 제작

## Development Environment
>Front-end: React<br/>
>Back-end: Node.js<br/>
>DB: MySQL<br/>
>Server: ASW Ubuntu 20.04 LTS

## Page

### 전체 사용자

### Main
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198031102-0cd39cce-5f1b-4d42-bfb7-58b83e46a69a.png">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198031438-50fc2b78-8181-4b38-86c8-ec24a448d9a7.png">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198031538-f8be467c-ee59-4330-a296-f9f1c4a6f7d4.png">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198031609-81984adb-8a7d-4344-8761-1693a57bbba1.png">
<div>

* 사이트에 접속했을 때 처음 보여지는 화면으로, 로그인을 진행할 수 있다.
	* 로그인은 kakao Login API를 사용하였다.

* 페이지를 아래로 스크롤하면 동아리 소개 페이지들을 보여준다.
	* 로그인 하지 않은 사용자도 볼 수 있는 페이지이다



### Profile
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198034592-51cf45de-d0d0-4bb8-bb5b-b76d9e544ce0.png">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198034602-4d717643-33f7-4d32-9ce8-85a6ad59d101.png">
<div>

* 출석 관련 경고(미통보 불참, 2주 연속 불참)를 보여준다.

* 훈련일인 경우 출석 버튼이 활성화된다.

* 출석버튼을 누르면 접속자의 ip를 조회해 지정된 ip와 같은 경우 출석 체크를 진행한다. (러쉬클랜_3F, 러쉬클랜_4F 와이파이로 접속한 경우 출석 가능)



### Attendance
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198036533-adea3438-b715-4854-918f-74edce7bb398.png">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198036561-40b48afd-da63-4add-a27a-d74e1a52315c.png">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198036575-3a1d7acf-2562-43a4-93dc-7b0b6cd04e7f.png">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198036593-57d7dc73-63dc-4eaa-8ddf-79cc10199c30.png">
<div>

* 매달 출석 정보를 파이차트로 보여준다.

* 페이지를 아래로 스크롤하면 상세 출석 정보를 확인할 수 있다.

* 마지막 페이지에서는 가입시기부터 현재까지의 누적 출석 정보를 보여준다.



### Calendar, Ranking, Notice
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198037566-35169bd7-3bfd-4c5f-935b-08201eb090ce.png">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198037878-d5853293-206b-4210-8863-9c17558bc0d4.png">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198038642-992898fb-49f8-407d-a693-80486e334066.png">
<div>

* 날짜를 터치하면 그날의 훈련일정을 확인할 수 있다.

* 매달 출석율을 기준으로 실시간 랭킹을 보여준다.

* 공지사항을 확인할 수 있다. 
	* 공지사항과 캘린더는 운영진만 수정 가능하다.


---

### 운영진

### Manage
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198039766-804d9483-700c-4409-99a4-f4f81402478b.png">
<div>

* 마그누스 운영진만 접근이 가능한 페이지이다.

* 회원 관리, 출석 관리, 경고자 확인, 미통보 불참 관리, 출석 통계 확인, IP 변경 기능을 제공한다. 



### 회원 관리
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198040417-8e497290-968f-443d-afac-c30d0bef29b3.png">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198041148-ff365379-81c2-434b-a0c1-0030abd1926a.png">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198040425-7e59db38-fc70-4170-912e-8e41f977c3a2.png">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198040448-ca9ac886-1671-4a84-ba55-282ec2da536a.png">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198040666-4b25a57f-6a31-47fa-9d89-237e0cfe63ad.png">
<div>

* 이름, 가입기수를 기준으로 정렬하여 조회가 가능하다.

* 회원 정보를 클릭하면 해당 회원의 상세 출석 데이터를 확인할 수 있다.



### 출석 관리
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198042127-c2eddd01-7216-453c-ba80-8c27d424c237.png">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198042137-b5fe66f4-8281-42ec-89ea-39bded9f0495.png">
<div>

* 회원들의 전체 출석 정보를 달력을 통해 확인할 수 있다.

* 달력 상단의 출석/지각/불참 버튼을 터치한 후, 날짜를 터치하면 해당 훈련인에 출석/지각/불참한 회원들의 명단을 확인할 수 있다.
	* 이상이 있는 경우 수정도 가능하다.



### IP 변경
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/198043263-a9ea6319-c92d-4d8e-b68b-b35e69f8b254.png">
<div>

* 출석 지정 IP를 확인할 수 있다. 

* IP를 새로 추가하거나 삭제할 수 있다.
	* 현재 접속 IP 불러오기 기능을 통해 편의성을 높였다.





