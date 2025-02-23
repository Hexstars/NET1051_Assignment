using Persistence.Data.Seed.SeedChild;

namespace Persistence.Data.Seed
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            SeedCategory.Seed(serviceProvider);
            SeedBrand.Seed(serviceProvider);
            SeedColor.Seed(serviceProvider);
            SeedMaterial.Seed(serviceProvider);
            SeedSize.Seed(serviceProvider);
            SeedProduct.Seed(serviceProvider);

        }
    }      
}
