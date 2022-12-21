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
>Server: AWS Ubuntu 20.04 LTS

## Page

### 전체 사용자

### Main
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207038766-229a5bce-65b0-4156-b471-47131b6083c3.jpg">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207038837-98424f45-1b80-49c3-a556-68497d6e0b1f.jpg">
<div>

* 사이트에 접속했을 때 처음 보여지는 화면으로, 로그인을 진행할 수 있다.
  * 로그인은 kakao Login API를 사용하였다.

* 페이지를 아래로 스크롤하면 동아리 소개 페이지들을 보여준다.
  * 로그인 하지 않은 사용자도 볼 수 있는 페이지이다



### Profile
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039005-fca3446f-e372-4c20-8915-44d39812da2b.jpg">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039010-943f91a0-5ef1-49da-8dfe-4e8d5230c3e0.jpg">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039023-c3744733-2cbb-4bc3-85f2-ac848145d11a.jpg">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039152-0866347d-75f9-4237-aa7e-d957b3d3e7b9.jpg">
<div>

* 출석 관련 경고(미통보 불참, 2주 연속 불참)를 보여준다.

* 훈련일인 경우 출석 버튼이 활성화된다.

* 출석버튼을 누르면 접속자의 ip를 조회해 지정된 ip와 같은 경우 출석 체크를 진행한다. (러쉬클랜_3F, 러쉬클랜_4F 와이파이로 접속한 경우 출석 가능)



### Technique
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207044188-faaf4628-f747-4486-a702-fcd2eb6799cb.jpg">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207044193-d2f2f32c-fe22-4011-8324-920a34aef2b0.jpg">
<div>

* 배우고 싶은 기술, 관심 있는 기술 등을 자유롭게 작성할 수 있다.

* 작성자의 익명이 보장되며, 작성된 기술은 본인만 삭제할 수 있다.



### Attendance
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039370-fff0aaa3-bd2b-4cd5-b4bc-408f0906b741.jpg">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039380-29eef592-b718-4418-96b8-075c338ed93a.jpg">
<div>

* 매달 출석 정보를 파이차트로 보여준다.

* 페이지를 아래로 스크롤하면 상세 출석 정보를 확인할 수 있다.

* 마지막 페이지에서는 가입시기부터 현재까지의 누적 출석 정보를 보여준다.



### Calendar, Ranking, Notice
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039533-05abfe83-089d-4f66-9b54-f2c693eaa2c1.jpg">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039541-e1a82c08-b7a3-497c-a1d7-6577ee7f4aad.jpg">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039544-0911b2a3-1f2d-4b42-9466-dd940f124731.jpg">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039555-bc88fe36-8c61-4441-a82a-7db4a455d202.jpg">
<div>

* 날짜를 터치하면 그날의 훈련일정을 확인할 수 있다.

* 매달 출석률을 기준으로 실시간 랭킹을 보여준다.

* 공지사항을 확인할 수 있다. 
	* 공지사항과 캘린더는 운영진만 수정 가능하다.


---

### 운영진

### Manage
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039704-2470cf20-ad07-4867-b336-ada1d4c17fdc.jpg">
<div>

* 마그누스 운영진만 접근이 가능한 페이지이다.

* 회원 관리, 출석 관리, 출석 통계 확인, IP 변경 기능 등을 제공한다. 



### 회원 관리
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039768-3a412ef3-cb7e-4f2c-9f6b-860a02a78111.jpg">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039775-d287ed9f-6b33-42b0-b2cb-c477deb8c10f.jpg">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039778-366ee054-6be5-43a6-b073-c594920cf3d5.jpg">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207039780-1d6a66f1-0e53-4058-b44f-bfcedd01871b.jpg">
<div>

* 이름, 가입기수를 기준으로 정렬하여 조회가 가능하다.

* 회원 정보를 클릭하면 해당 회원의 상세 출석 데이터를 확인할 수 있다.



### 출석 관리
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207368198-fc847f29-7adb-4bc2-8a3c-621287a74d99.jpg">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207368209-e4dea165-5e6e-4238-b023-4d0f70c8507f.jpg">
<div>

* 회원들의 전체 출석 정보를 달력을 통해 확인할 수 있다.

* 달력 상단의 출석/지각/불참 버튼을 터치한 후, 날짜를 터치하면 해당 훈련인에 출석/지각/불참한 회원들의 명단을 확인할 수 있다.
	* 이상이 있는 경우 수정도 가능하다.



### IP 변경
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207040134-fbf01b3b-cec5-4210-8d10-5dd539bb6b98.jpg">
<div>

* 출석 지정 IP를 확인할 수 있다. 

* IP를 새로 추가하거나 삭제할 수 있다.
	* 현재 접속 IP 불러오기 기능을 통해 편의성을 높였다.


### 가입 기수
<div>
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207040192-aaad3883-4ad9-41a2-a9c5-2f9e984fd6e0.jpg">
<img width="120px" src="https://user-images.githubusercontent.com/84197474/207040208-cf7d842c-b624-4b01-9246-6ac7facf9883.jpg">
<div>

* 가입 기수별로 회원을 조회할 수 있다. 

* 가입 기수를 터치하면 해당 기수 회원들을 보여준다.
	* 해당 기수의 평균 출석률을 나타내는 파이차트도 추가하였다.

