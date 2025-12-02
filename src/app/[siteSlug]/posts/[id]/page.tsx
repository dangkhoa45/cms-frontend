import { cookies } from "next/headers";
import { getSiteBySlug, backendApi } from "@/libs/api";
import { notFound } from "next/navigation";
import { Container, Typography, Box } from "@mui/material";

export default async function SitePostPage(props: {
  params: Promise<{ siteSlug: string; id: string }>;
}) {
  const { siteSlug, id } = await props.params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const site = await getSiteBySlug(siteSlug, cookieHeader).catch(() => null);
  if (!site) {
    notFound();
  }

  const post = await backendApi.public.posts
    .detail(site.id, id, cookieHeader)
    .catch(() => null);

  if (!post) {
    notFound();
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        {post.title}
      </Typography>
      {post.featuredImage && (
        <Box
          component="img"
          src={post.featuredImage}
          alt={post.title}
          sx={{
            width: "100%",
            maxHeight: 400,
            objectFit: "cover",
            mb: 3,
            borderRadius: 2,
          }}
        />
      )}
      <Box
        component="div"
        sx={{ mt: 3 }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Container>
  );
}
