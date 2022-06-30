window.onload = function () {
  const $form = document.getElementById("form");
  const $input = document.getElementById("input");
  const logs = document.getElementById("logs");

  // 전체 범위 숫자를 담을 배열
  const numbers = [];

  for (let i = 0; i < 9; i++) {
    numbers.push(i + 1);
  }
  // numbers 배열에 1~9까지가 담긴다.

  // 무작의 4자리 수 추출
  const answer = [];

  for (let i = 0; i < 4; i++) {
    // index 번호는 0부터 시작하니까.
    // 맨 아래서 numbers 배열에서 하나씩 값을 제거하면 총 개수가 줄어드니까 (9 - i)
    // 재사용을 위해서 (9 - i) 대신 numbers.length를 사용
    const index = Math.floor(Math.random() * numbers.length);
    // answer 배열에 index 0~3을 담고
    answer.push(numbers[index]);
    // numbers 배열에서 해당 index를 가진 값을 제거한다.
    numbers.splice(index, 1);
  }

  console.log(answer);

  const tries = [];
  console.log(tries);
  // 유효성 검사
  function checkInput(input) {
    if (input.length !== 4) {
      return alert("4자리 숫자를 입력해 주세요.");
    }
    if (new Set(input).size !== 4) {
      return alert("중복되지 않게 입력해 주세요.");
    }
    if (tries.includes(input)) {
      return alert("이미 시도된 값입니다.");
    }

    return true;
  }

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = $input.value;
    // const value = event.target[0].value;
    $input.value = "";
    const valid = checkInput(value);
    if (!valid) {
      return;
    }

    tries.push(value);
    if (answer.join("") === value) {
      logs.textContent = "홈런";
      return;
    }
    if (tries.length >= 9) {
      const message = document.createTextNode(
        `패배! 정답은 ${answer.join("")}`
      );
      logs.appendChild(message);
      return;
    }
    // 몇 스트라이크 몇 볼인지 검사
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < answer.length; i++) {
      const index = value.indexOf(answer[i]);
      if (index > -1)
        if (index === i) {
          strike += 1;
        } else {
          ball += 1;
        }
    }
    logs.append(
      `${value}: ${strike} 스트라이크 ${ball} 볼`,
      document.createElement("br")
    );
  });
};
