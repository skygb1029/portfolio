<template>
  <main class="mx-auto max-w-3xl px-5 pb-20 pt-28 sm:px-8">
    <h1 class="mb-6 text-4xl font-bold">GA4 報表隱私權政策</h1>
    <p class="mb-8 text-lg leading-relaxed">JR JIM Portfolio 提供網站管理者與獲授權的協作者查看 Portfolio 的流量趨勢、熱門頁面、流量來源和事件統計。</p>
    <div class="space-y-7 leading-relaxed">
      <section>
        <h2 class="mb-2 text-xl font-semibold">存取與用途</h2>
        <p>當你選擇連線 Google 帳戶並授權後，報表會使用 Google Analytics 唯讀權限（analytics.readonly），向 Google Analytics Data API 查詢 Portfolio 網頁串流的彙總數字。Google Analytics 資源的存取權限由資源管理者設定。查詢採用該授權帳戶的權限，資料只用來顯示站內報表。</p>
      </section>
      <section>
        <h2 class="mb-2 text-xl font-semibold">處理、儲存與分享</h2>
        <p>瀏覽器將短效存取權杖直接送給 Google Analytics Data API。應用程式把權杖和報表結果留在目前頁面的記憶體，未將這些資料寫入瀏覽器持久儲存或應用程式伺服器。應用程式不出售或對外分享經此授權取得的 Google 使用者資料，也不將它用於廣告。</p>
      </section>
      <section>
        <h2 class="mb-2 text-xl font-semibold">中斷連線與撤銷授權</h2>
        <p>你可以在報表按「中斷連線」，或關閉頁面以清除畫面和當前存取權杖。若要撤銷 Google 帳戶上的應用程式授權，可到 <a class="underline" href="https://myaccount.google.com/connections">Google 帳戶的第三方連結設定</a> 移除應用程式存取權。</p>
      </section>
      <section>
        <h2 class="mb-2 text-xl font-semibold">聯絡方式</h2>
        <p>報表資料或授權如有疑問，請透過 <RouterLink class="underline" to="/contact">Portfolio 聯絡頁</RouterLink> 與 JR JIM 聯繫。</p>
      </section>
    </div>
  </main>
</template>
