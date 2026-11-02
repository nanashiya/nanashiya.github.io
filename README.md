# 無梨屋つくね / NANASHIYA TSUKUNE

無梨屋つくねの公式SNSリンク集。HTML・CSS・Vanilla JavaScriptのみで構成し、ビルドや外部ライブラリは不要です。

## ファイル構成

- `index.html`：プロフィール、SEO・OGP設定、ページ構造
- `assets/style.css`：レイアウトとブランドカラー（冒頭のCSS変数）
- `assets/links.js`：SNSの表示名・説明・URL・表示順
- `assets/site.js`：カードの描画、安全なリンクの設定
- `assets/favicon.svg`：梨の仮アイコン
- `assets/ogp.png`：SNS共有用画像
- `.nojekyll`：GitHub Pagesで静的ファイルをそのまま配信

## プレビュー

リポジトリのルートで以下を実行し、ブラウザーで `http://localhost:8000` を開きます。

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

終了は Ctrl+C。依存パッケージのインストールは不要です。

## SNSの更新

`assets/links.js` の配列だけを編集します。配列の順番が表示順です。項目の追加・削除もこの配列で行います。

- 通常のSNS：`url: ''` に本人の実際のHTTPS URLを入力します。
- Discord：`userId: ''` に本人の17〜20桁の数字のユーザーIDを文字列で入力します。Discordの開発者モードで「ユーザーIDをコピー」して取得します。招待コードや表示名は使いません。
- Discordのリンクは `https://discord.com/users/ユーザーID` になります。プロフィールを開くもので、自動でフレンド登録する機能ではありません。
- 空欄、不正なURL、HTTPS以外、認証情報を含むURLはクリック不可の「準備中」表示になります。未設定項目はキーボードのTab移動対象にもなりません。
- `service` は `x`、`vrchat`、`discord`、`booth`、`note` に対応。別の値では汎用アイコンを表示します。既存のアイコンは外部読み込みのないインラインSVGです。

全6件に指定のSNSリンクを設定済みです。未設定に戻す場合は対象のURL（DiscordはユーザーID）を空欄にします。新しいタブで開くリンクには `noopener noreferrer` を付与します。

## プロフィール・色の更新

名前とメッセージは `index.html` の `.profile` 内を編集します。名前やメッセージを変更する際は、同ファイルの `title`、description、OGP、共有画像も見直してください。

正式なプロフィール画像は `assets/profile.webp` などに置き、`.avatar` 内の仮アイコン2要素を以下に置き換えます。隣接する見出しと重複する装飾画像として扱っています。

```html
<img src="assets/profile.webp" alt="" width="116" height="116">
```

色は `assets/style.css` の `:root` でまとめて変更できます。共有画像は `assets/ogp.png` を1200×630pxの画像で差し替えられます。将来の作品ページやブログは独立したディレクトリとして追加できますが、現在は実装していません。

## 確認項目

- スマートフォン・タブレット・PCで横スクロールや文字切れがないこと
- 6枚が指定順に表示され、設定したURLが開くこと。URLを空欄にした場合はクリックできないこと
- 実際のURLを設定した際に、カード全体がリンクとなり新しいタブで開くこと
- Tabキーのフォーカス表示、スキップリンク、OSの「動きを減らす」設定
- JavaScript無効時は案内文が表示されること

## GitHub Pagesへの公開（所有者の確認後）

GitHub Pagesの有効化・独自ドメインの設定は別途、所有者の確認後に行います。以下はその手順です。

1. 変更をコミットし、リポジトリの `main` へ反映します。
2. GitHubリポジトリの Settings → Pages → Build and deployment で **Deploy from a branch** を選び、`main` / `/ (root)` を保存します。ビルドコマンドは不要です。
3. 独自ドメイン利用前に、まずPagesの配信内容を確認します。SEOのcanonical・OGP URLは最終公開先 `https://nanashiya.com/` としています。
4. ドメインの所有権をGitHubのアカウント設定（Settings → Pages → Add a domain）で検証し、指示されたTXTレコードをドメイン管理画面に追加します。検証用の値はGitHubが発行したものを使用してください。
5. リポジトリの Settings → Pages → Custom domain に `nanashiya.com` を入力して保存します。ブランチ方式ではGitHubがルートに `CNAME` を作成します。現段階では意図しないドメイン適用を避けるためCNAMEを置いていません。
6. ドメイン管理会社で、ルートドメイン（`@`）のAレコードを以下の4件に設定します。既存のWeb向けA/AAAA/CNAMEがある場合は影響を確認してから整理し、メール用MX・TXTなどは保持してください。

   ```text
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

7. `www` も利用する場合は `www` のCNAMEを `nanashiya.github.io` に設定します（URLやパスではありません）。ワイルドカードDNSは設定しません。
8. GitHub側のDNSチェック成功と証明書発行を待ち、**Enforce HTTPS** を有効にします。DNS反映には最大24時間程度かかる場合があります。
9. `https://nanashiya.com/` の表示、6枚のリンク、共有画像、HTTPSと必要に応じたwwwからの転送を確認します。

DNSの値と画面構成は設定時に公式手順を再確認してください。

- [GitHub Pagesの公開元](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [カスタムドメインの管理](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [ドメインの検証](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
