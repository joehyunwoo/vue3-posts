<template>
  <div>
    <h2>게시글 목록</h2>

    <hr class="my-4" />

    <PostFilter
      v-model:searchTitle="params.title_like"
      :viewLimit="params._limit"
      @update:viewLimit="changeLimit"
    />

    <hr class="my-4" />

    <AppLoading v-if="loading"></AppLoading>

    <AppError v-else-if="error" :message="error.message"></AppError>

    <template v-else-if="!isExist">
      <p class="text-center py-5 text-muted">No Results</p>
    </template>

    <template v-else>
      <AppGrid :items="posts" col-class="col-12 col-md-6 col-lg-4">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @Click="goDetailPage(item.id)"
            @modal="openModal(item)"
            @preview="selectPreview(item.id)"
          ></PostItem>
        </template>
      </AppGrid>
      <AppPagination
        :current-page="params._page"
        :page-cnt="pageCnt"
        @page="page => (params._page = page)"
      />
    </template>
    <Teleport to="#modal">
      <PostModal
        v-model:show="show"
        :modalPostTitle="modalPostTitle"
        :modalPostContent="modalPostContent"
        :modalPostCreatedAt="modalPostCreatedAt"
      />
    </Teleport>
    <template v-if="previewId">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="previewId"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/composables/axios';

const router = useRouter();
const previewId = ref(null);
const selectPreview = id => (previewId.value = id);

const goDetailPage = id => {
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  });
};

//pagination
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 6,
  title_like: '',
});
const totalCnt = computed(() => respose.value.headers['x-total-count']);
const pageCnt = computed(() => {
  return Math.ceil(totalCnt.value / params.value._limit);
});
const changeLimit = limit => {
  params.value._limit = limit;
  params.value._page = 1;
};
const { respose, data: posts, error, loading } = useAxios('/posts', { params });
const isExist = computed(() => posts.value && posts.value.length > 0);

//modal
const show = ref(false);
const modalPostTitle = ref();
const modalPostContent = ref();
const modalPostCreatedAt = ref();

const openModal = ({ title, content, createdAt }) => {
  modalPostTitle.value = title;
  modalPostContent.value = content;
  modalPostCreatedAt.value = createdAt;
  show.value = true;
};
</script>

<style lang="scss" scoped></style>
