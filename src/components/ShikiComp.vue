<template>
	<div v-html='text' />
</template>

<script setup lang="ts">
import { getHighlighterCore } from 'shiki/core';
import getWasm from 'shiki/wasm';

import slack from 'shiki/themes/slack-dark.mjs';


const code_to_highlight = `/// Spawn a request into a tokio thread
fn spawn_request(
    token: &str,
    registration: Registration,
    sx: &std::sync::mpsc::Sender<Result<Vec<SearchResponse>, AppError>>,
) {
    let token = token.to_owned();
    let sx = sx.clone();
    tokio::spawn(async move {
        let result = request(&registration, &token).await;
        sx.send(result).ok();
    });
}`

const theme = 'slack-dark';

const text = ref("");

onBeforeMount(async () => {
	const highlighter = await getHighlighterCore({
	themes: [ slack ],
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	langs: [ () => import('shiki/langs/rust.mjs') ],
	loadWasm: getWasm
});
	text.value = highlighter.codeToHtml(code_to_highlight, {
		lang: "rust",
		theme,
	});
});

</script>

<style>
code {
	counter-reset: step;
	counter-increment: step 0;
}

pre {
	font-size: 0.75rem!important;
}

.numbered_line .line::before {
	content: counter(step);
	counter-increment: step;
	width: 1rem;
	margin-right: 1rem;
	display: inline-block;
	text-align: right;
	color: rgba(115, 138, 148, 0.4);
}

</style>