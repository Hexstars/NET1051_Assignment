using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence.Data.Seed.SeedChild
{
    public static class SeedVariationOption
    {
        public static void Seed(this IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(serviceProvider
                .GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                if (!context.VariationOptions.Any())
                {
                    var variationOptions = new List<VariationOption>
                    {
                        // Size giày Tây
                        new VariationOption
                        { Id = Guid.Parse("e0fbc4ec-9d8f-4fbe-a8e3-c267316c65b5"), Value = "41",
                            VariationId = Guid.Parse("feb388bc-4cf4-4e2d-96bb-dbc41badfe20") },
                        new VariationOption
                        { Id = Guid.Parse("62b07e1b-e37b-4942-9cb6-5a73aa4efbc1"), Value = "42",
                            VariationId = Guid.Parse("feb388bc-4cf4-4e2d-96bb-dbc41badfe20") },
                        new VariationOption
                        { Id = Guid.Parse("c84168f3-80d6-48d8-92c4-c7401f5b8576"), Value = "43",
                            VariationId = Guid.Parse("feb388bc-4cf4-4e2d-96bb-dbc41badfe20") },

                        // Material giày Tây
                        new VariationOption
                        { Id = Guid.Parse("511e34d5-8c77-456d-a4dc-231860901395"), Value = "Embossed Leather",
                            VariationId = Guid.Parse("eb7f74fe-bdbd-4e3d-8932-63d0f49d5369") },
                        new VariationOption
                        { Id = Guid.Parse("33d2bdad-612a-41bd-a71d-7f8e255b2e1e"), Value = "Saffiano Leather",
                            VariationId = Guid.Parse("eb7f74fe-bdbd-4e3d-8932-63d0f49d5369") },
                        new VariationOption
                        { Id = Guid.Parse("ab097a3a-433f-4736-927b-0a0f433e9d2e"), Value = "Suede Leather",
                            VariationId = Guid.Parse("eb7f74fe-bdbd-4e3d-8932-63d0f49d5369") },

                        // Size giày thể thao
                        new VariationOption
                        { Id = Guid.Parse("533046d5-4266-480a-8b64-d2309949a2dc"), Value = "41",
                            VariationId = Guid.Parse("f1ba7ba4-9601-4205-91a6-a3529a98b52c") },
                        new VariationOption
                        { Id = Guid.Parse("173285bf-403c-43e9-86f9-23639571f685"), Value = "42",
                            VariationId = Guid.Parse("f1ba7ba4-9601-4205-91a6-a3529a98b52c") },
                        new VariationOption
                        { Id = Guid.Parse("94faf8fb-ae04-4be3-9908-da502fe92cbc"), Value = "43",
                            VariationId = Guid.Parse("f1ba7ba4-9601-4205-91a6-a3529a98b52c") },

                        // Material giày thể thao
                        new VariationOption
                        { Id = Guid.Parse("d45f594f-2a4d-4b3a-a32e-9f58c061aa6f"), Value = "Mesh",
                            VariationId = Guid.Parse("c1a51273-aa95-4dd0-b11a-4ee7cec2979d") },
                        new VariationOption
                        { Id = Guid.Parse("674fe022-16ec-418e-a2e5-fe8ec4e6ab8b"), Value = "Da tự nhiên",
                            VariationId = Guid.Parse("c1a51273-aa95-4dd0-b11a-4ee7cec2979d") },
                        new VariationOption
                        { Id = Guid.Parse("31be20ec-9d33-44de-8641-5470085969b1"), Value = "Da nhân tạo",
                            VariationId = Guid.Parse("c1a51273-aa95-4dd0-b11a-4ee7cec2979d") },

                        // Size giày cao gót nữ
                        new VariationOption
                        { Id = Guid.Parse("ddb01fad-26ae-4e5b-9c02-0c8ccd7ea341"), Value = "35",
                            VariationId = Guid.Parse("e5f9c3eb-ecbb-4022-9ef1-3c360a583e27") },
                        new VariationOption
                        { Id = Guid.Parse("c8148581-c9ac-4dd8-aa1a-bba1e3c50173"), Value = "36",
                            VariationId = Guid.Parse("e5f9c3eb-ecbb-4022-9ef1-3c360a583e27") },
                        new VariationOption
                        { Id = Guid.Parse("6fc11b2e-53c3-4b13-9656-0113274e15f6"), Value = "37",
                            VariationId = Guid.Parse("e5f9c3eb-ecbb-4022-9ef1-3c360a583e27") },

                        // Material giày cao gót nữ
                        new VariationOption
                        { Id = Guid.Parse("0772504d-2aa7-49ab-a405-afbfa889b989"), Value = "Si mờ trơn ",
                            VariationId = Guid.Parse("39e24347-f197-43d4-9376-1abf8b9be9ed") },
                        new VariationOption
                        { Id = Guid.Parse("670ffd1b-2914-43bd-b3fa-d8abd0a4202e"), Value = "Da tổng hợp",
                            VariationId = Guid.Parse("39e24347-f197-43d4-9376-1abf8b9be9ed") },
                    };
                    context.VariationOptions.AddRange(variationOptions);
                    context.SaveChanges();
                }
            }
        }
    }
}
