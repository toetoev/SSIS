using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using SSIS.Databases;
using SSIS.Repositories;
using SSIS.Services;

namespace SSIS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // services.AddCors();
            services.AddControllers().AddNewtonsoftJson();

            services.AddDbContext<DataContext>(opt => opt.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("DbConn")));
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            var key = Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:JWTSecret").Value);
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
                };
            });

            services.AddScoped<DataInitializer>();

            services.AddScoped<IAdjustmentItemService, AdjustmentItemService>();
            services.AddScoped<IAdjustmentService, AdjustmentService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IDelegationService, DelegationService>();
            services.AddScoped<IDeptService, DeptService>();
            services.AddScoped<IDeptStaffService, DeptStaffService>();
            services.AddScoped<IItemService, ItemService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IRequisitionItemService, RequisitionItemService>();
            services.AddScoped<IRequisitionService, RequisitionService>();
            services.AddScoped<IRetrievalItemService, RetrievalItemService>();
            services.AddScoped<IRetrievalService, RetrievalService>();
            services.AddScoped<ISupplierService, SupplierService>();

            services.AddScoped<IAdjustmentRepository, AdjustmentRepository>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IDelegationRepository, DelegationRepository>();
            services.AddScoped<IDeptRepository, DeptRepository>();
            services.AddScoped<IDeptStaffRepository, DeptStaffRepository>();
            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IRequisitionItemRepository, RequisitionItemRepository>();
            services.AddScoped<IRequisitionRepository, RequisitionRepository>();
            services.AddScoped<IRetrievalItemRepository, RetrievalItemRepository>();
            services.AddScoped<IRetrievalRepository, RetrievalRepository>();
            services.AddScoped<IStoreStaffRepository, StoreStaffRepository>();
            services.AddScoped<ISupplierRepository, SupplierRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataInitializer dataInitializer)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
            //dataInitializer.Seed();
        }
    }
}