### [넘블 챌린지] 
### [React] 상태관리 라이브러리를 사용하지 않고 다른 색깔 찾기 게임 제작
# Selecolor
![logo](https://user-images.githubusercontent.com/46489446/153755325-ac70772b-eb41-4cf4-87ce-b4d995c78574.png)
-----
https://selecolor.vercel.app/
-----
## Components

#### Layout.tsx

_app.tsx 페이지에서 호출해서 사용하며 모든 페이지를 감싸는 layout 컴포넌트이다. 모든 페이지에 적용하고 싶은 PageLink.tsx와 같은 컴포넌트가 들어가기 적절한 컴포넌트이다. 

 

#### PageLink.tsx

깃허브로 이동하는 Link가 있는 컴포넌트. 추후 다른 페이지도 연결 가능.

 

#### Seo.tsx

SEO 최적화를 위해 실제 html의 head에 들어갈 내용을 next/Head를 사용해 page 가장 상단에 들어갈 컴포넌트. title을 props로 받아 페이지마다 다른 <title> 적용 가능.

 

#### Modal.tsx

modal 컴포넌트를 여러개 만들 수 있는 모달 컴포넌트이다. 모달창이 나오는 백그라운드를 어둡게 처리해주는 용도이다.

 

#### AlertModal.tsx

위 모달 컴포넌트를 사용해 만든 알림 컴포넌트이다. 시간이 다 지났을때 display되어 누적 스코어와 게임을 다시할지 종료할지를 표시한다. 넘블 조건에는 없었지만 고도화해서 랭크 기능(RankModal.tsx) 추가 중임.

 

#### ImgButton.tsx

AlertModal 혹은 다른 곳에 사용되는 이미지와 함께 있는 버튼 컴포넌트이다. 이미지와 텍스트 그리고 버튼 클릭 핸들러를 props로 받는다.

 

#### StageTime.tsx

game 페에지에 stage와 time이 표시하는 컴포넌트. 

 

#### BoxItem.tsx

Game에 사용되는 박스 컴포넌트이다. 해당 박스가 목표로 하는 박스가 맞는지 내부에서 판단해서 props로 내려받은 것들이 적용된다.

#### BoxContainer.tsx

위에서 보았던 BoxItem.tsx를 반복해서 디스플레이하는 컴포넌트이다.

display: grid 를 통해 컴포넌트를 제작했다. 

## Containers

 

#### getBoxCnt.ts

박스 개수를 반환하는 함수

 

#### getBoxRange.ts

박스 개수에 맞는 배열을 반환하는 함수

 

#### getGridCnt.ts

BoxContainer에 grid로 반복될 수를 반환하는 함수

 

#### getTargetIndex.ts

정답이 될 박스의 인덱스를 반환하는 함수

 

#### getColorPercent.ts

정답이 될 박스의 색을 조정하여 반환하는 함수

stage*0.1 씩 더해주는 연산을 거치고, 0.8 이상이 될 경우 0.8로 고정을 시켜주었다.

 

#### getRandomColor.ts

랜덤으로 색을 반환하는 함수

 

 

## pages

 

#### index.tsx
  ![스크린샷 2022-02-13 오후 10 30 46](https://user-images.githubusercontent.com/46489446/153755426-3bde8f60-af43-4ab9-b9b0-55f16aa2df3b.png)

가장 먼저 사용자가 마주하게 될 index페이지.

Selecolor의 로고와 게임을 시작할 수 있는 페이지로의 링크 버튼이 있다.

 

#### game.tsx
  ![스크린샷 2022-02-13 오후 10 32 07](https://user-images.githubusercontent.com/46489446/153755471-7cac422e-0669-4b7c-a3fe-b9322c820f1d.png)


게임이 이루어지는 페이지.
시간이 다 지나면 AlertModal를 표시해 Time out을 알린다.
  
 ![스크린샷 2022-02-13 오후 10 33 06](https://user-images.githubusercontent.com/46489446/153755509-2ed7b334-6f0f-4dd5-82e8-e5ee8c28aef0.png)
