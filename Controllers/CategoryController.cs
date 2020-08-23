using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using SSIS.Services;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("")]
        [Authorize(Roles = StoreRole.All)]
        public IActionResult GetAllCategories()
        {
            return Ok(_categoryService.GetAllCategories().Result);
        }

        [HttpGet("{categoryName}")]
        [Authorize(Roles = StoreRole.All)]
        public IActionResult GetAllItems([FromRoute] string categoryName)
        {
            return Ok(_categoryService.GetCategoryById(categoryName).Result);
        }
    }
}