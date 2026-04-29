// drawer_________________
// icon-bar
jQuery("#js-drawer-icon").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-icon").toggleClass("is-checked");
  jQuery("#js-drawer__contents-lists").toggleClass("is-checked");
});

//   drawerが開く Q&Aも同じ
jQuery(".js-accordion").on("click", function (e) {
  e.preventDefault();

  if (jQuery(this).parent().hasClass("is-open")) {
    jQuery(this).parent().removeClass("is-open");
    jQuery(this).next().slideUp();
  } else {
    jQuery(this).parent().addClass("is-open");
    jQuery(this).next().slideDown();
  }
});

// ドロワーからクリックしてスムーススクロール ＆ ドロワーが消える
jQuery('#js-drawer__contents-lists a[href^="#"]').on("click", function (e) {
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer__contents-lists").removeClass("is-checked");
});

// スムーススクロール
jQuery('a[href^="#"]').on("click", function (e) {
  const speed = 1000;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" == id ? "html" : id);
  const position = jQuery(target).offset().top;

  jQuery("html,body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing" //swing or linear
  );
});
//
//
//
//
//
//
// spotsのswiper_____________________________________________________
const swiper = new Swiper("#js-spots-swiper", {
  slidesPerView: "auto",
  spaceBetween: 16, //カード間の余白

  loop: true,
  initialSlide: 3, // ★ 4枚目（0始まり）
  centeredSlides: true, // ★ 中央に配置

  // ★ loop + centeredSlides 時の安定化
  loopAdditionalSlides: 1,
  centeredSlidesBounds: true,

  watchOverflow: true,
  pagination: {
    el: "#js-spots-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: "#js-spots-next",
    prevEl: "#js-spots-prev",
  },

  //PC時___________________________________
  breakpoints: {
    768: {
      initialSlide: 0, // PCは1枚目
      spaceBetween: 30, //カード間の余白
      centeredSlides: false,//ちょいずれ修正
    },
  },
});

//
//
//
//
//
// about下のswiper_____________________________________________________
// gallery swiper一定のスピードで滑らかに流れ続ける動きで実装
jQuery(function ($) {
  const gallerySwiper = new Swiper("#js-gallery-swiper", {
    slidesPerView: "auto",
    spaceBetween: 10,
    loop: true,
    speed: 3000,
    allowTouchMove: false,

    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },

    freeMode: true,
    freeModeMomentum: false,
    centeredSlides: false,
  });
});

//   QA______________________________________________________

// jQuery(".js-accordion").on("click", function (e) {
//   e.preventDefault();

//   if (jQuery(this).parent().hasClass("is-open")) {
//     jQuery(this).parent().removeClass("is-open");
//     jQuery(this).next().slideUp();
//   } else {
//     jQuery(this).parent().addClass("is-open");
//     jQuery(this).next().slideDown();
//   }
// });

//
//
//
//
//
//
// prizes______________________________________________
jQuery(function ($) {
  // 開く
  $(".prize__box").on("click", function () {
    const id = $(this).data("modal");
    document.getElementById("js-prizes-modal-" + id).showModal();
  });

  // 閉じるボタン
  $(".js-modal-close").on("click", function () {
    $(this).closest("dialog")[0].close();
  });

  // 背景クリックで閉じる
  $("dialog").on("click", function (e) {
    if (e.target === this) {
      this.close();
    }
  });
});

// スクロールに合わせてトップへ戻るボタンを表示する

jQuery(window).on("scroll", function () {
  if (100 < jQuery(window).scrollTop()) {
    jQuery("#js-pagetop, .pagetop-sp").addClass("is-show");
  } else {
    jQuery("#js-pagetop, .pagetop-sp").removeClass("is-show");
  }
});
//
//
//
//
//
//
// footer__________________________________________________
// topボタンをトップから300pxスクロールしたら300msかけて表示する
const topbtn = jQuery("#js-pagetop, .pagetop-sp");
jQuery(window).on("scroll", function () {
  if (jQuery(this).scrollTop() > 300) {
    topbtn.fadeIn(300);
  } else {
    topbtn.fadeOut(300);
  }
});

// topへ戻る 300s かけて
jQuery("#js-pagetop, .pagetop-sp").on("click", function () {
  jQuery("html,body").animate({ scrollTop: 0 }, 500);
});
//
//
//
//
//
//
//   contact お問い合わせ____________________________________

// エラーを出す関数
function showError($input, message) {
  const $field = $input.closest(".form-field");

  if (!$field.length) return;

  // エラー状態ON
  $field.addClass("is-error");

  // エラーメッセージ
  $field.find(".form-field__error").text(message);
}

//   エラーを消す関数
function clearError($input) {
  const $field = $input.closest(".form-field");

  if (!$field.length) return;

  // エラー状態OFF
  $field.removeClass("is-error");

  // メッセージ削除
  $field.find(".form-field__error").text("");
}
//
//
//
//
//  バリデーションエラーを実装jQuery(function ($) {
const $form = $("#js-contact-form");

$form.on("submit", function (e) {
  const form = this;

  // 全体チェック
  if (!form.checkValidity()) {
    e.preventDefault();

    // いったん全エラー削除
    $(".form-field").removeClass("is-error");

    // 各必須項目をチェック
    $(form)
      .find("input, select, textarea")
      .each(function () {
        if (!this.checkValidity()) {
          $(this).closest(".form-field").addClass("is-error");
        }
      });
  }
});

// 入力中にエラー解除
$form.find("input, select, textarea").on("input change", function () {
  if (this.checkValidity()) {
    $(this).closest(".form-field").removeClass("is-error");
  }
});

// 送信成功時にはアラートを表示
jQuery(function ($) {
  const $form = $(".contact__form");

  $form.on("submit", function (e) {
    e.preventDefault(); // ← まず送信止める

    const form = this;

    // HTML標準バリデーション実行
    if (form.checkValidity()) {
      alert("送信が完了しました。");

      form.reset(); // フォームリセット（任意）
    } else {
      form.reportValidity(); // ブラウザ標準エラー表示
    }
  });
});
