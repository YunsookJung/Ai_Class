/* ==========================================
   AI 업무 자동화 교안 인터랙션 스크립트 (script.js)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. 사이드바 내비게이션 (탭 전환)
  const navItems = document.querySelectorAll('.nav-item');
  const docPages = document.querySelectorAll('.doc-page');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');

      // 활성 내비게이션 메뉴 변경
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      // 활성 페이지 콘텐츠 변경
      docPages.forEach(page => {
        if (page.id === targetId) {
          page.classList.add('active');
        } else {
          page.classList.remove('active');
        }
      });

      // 전환 시 최상단으로 부드럽게 스크롤
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });

  // 2. 프롬프트 복사 기능
  const copyButtons = document.querySelectorAll('.btn-copy');

  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const textToCopy = button.getAttribute('data-clipboard');

      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        
        // 시각적 피드백 효과 적용
        const originalText = button.textContent;
        button.textContent = '복사됨!';
        button.classList.add('copied');

        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove('copied');
        }, 1500);

      } catch (err) {
        console.error('클립보드 복사 실패:', err);
        // 대체 수단: 임시 텍스트 영역 사용
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          button.textContent = '복사됨!';
          button.classList.add('copied');
          setTimeout(() => {
            button.textContent = '복사';
            button.classList.remove('copied');
          }, 1500);
        } catch (e) {
          alert('복사에 실패했습니다. 수동으로 드래그하여 복사해 주세요.');
        }
        document.body.removeChild(textarea);
      }
    });
  });

  // 3. 인쇄 및 PDF 저장 기능
  const printButton = document.getElementById('btn-print');
  if (printButton) {
    printButton.addEventListener('click', () => {
      window.print();
    });
  }

});
