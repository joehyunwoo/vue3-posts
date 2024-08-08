<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <PostFilter
      v-model:searchTitle="postSortParams.title_like"
      v-model:viewLimit="postSortParams._limit"
    />
    <hr class="my-4" />
    <AppGrid v-slot="{ item }" :items="posts">
      <PostItem
        :title="item.title"
        :content="item.content"
        :created-at="item.createdAt"
        @Click="goDetailPage(item.id)"
      ></PostItem>
    </AppGrid>
    <AppPagination
      :current-page="postSortParams._page"
      :page-cnt="pageCnt"
      @page="page => (postSortParams._page = page)"
    />
    <hr class="my-5" />
    <AppCard>
      <PostDetailView id="3"></PostDetailView>
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import AppCard from '@/components/AppCard.vue';
import AppPagination from '@/components/AppPagination.vue';
import AppGrid from '@/components/AppGrid.vue';
import { getPosts } from '@/api/posts';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const posts = ref([]);
const router = useRouter();

//pagination
const postSortParams = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
});
const totalCnt = ref(0);
const pageCnt = computed(() => {
  return Math.ceil(totalCnt.value / postSortParams.value._limit);
});
//

const fetchPosts = async () => {
  try {
    const { data, headers } = await getPosts(postSortParams.value);
    posts.value = data;
    totalCnt.value = headers['x-total-count'];
  } catch (err) {
    console.log(err);
  }
};
const goDetailPage = id => {
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  });
};

watchEffect(fetchPosts);
</script>

<style lang="scss" scoped></style>
