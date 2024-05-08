<template>
	<pre
		class='language-rust'
		v-html='highlighted_code'
		/>
</template>

<script setup lang="ts">
import '@/scss/prism.css';
import prism from 'prismjs';
import 'prismjs/components/prism-rust';

const code =`/// Spawn a request into a tokio thread
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

const highlighted_code = computed((): string => {
	return prism.highlight(code, prism.languages.rust, 'rust');
});

</script>
